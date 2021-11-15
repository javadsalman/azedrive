import iaxios from './../../iaxios';

import {
    ADD_FILE,
    ADD_FOLDER,
    DELETE_FILE,
    DELETE_FOLDER,
    SET_FILES,
    SET_FOLDERS,
    SET_LOADING,
    STAR_FILE,
    STAR_FOLDER,
    SET_SELECTED,
    SET_TOTAL_SIZE
} from './actionTypes';


export function setSelected(id, itemType) {
    return {
        type: SET_SELECTED,
        id: id,
        itemType: itemType,
    };
};

function setLoadingAction(loadingValue) {
    return {
        type: SET_LOADING,
        loadingValue
    };
};

function setTotalSizeAction(totalSize, totalSizeLimit) {
    return {
        type: SET_TOTAL_SIZE,
        totalSize,
        totalSizeLimit
    };
};

// load total size and total size limit from api
export function loadTotalSize() {
    return dispatch => {
        iaxios.get('/totalsize/').then(response => {
            dispatch(setTotalSizeAction(
                response.data.totalSize,
                response.data.totalSizeLimit
            ));
        });
    };
};

function setFilesAction(newFiles) {
    return {
        type: SET_FILES,
        files: newFiles
    };
};

function setFoldersAction(newFolders) {
    return {
        type: SET_FOLDERS,
        folders: newFolders
    };
};

// default load settings. We need declare these properties before contstruct filterParams object
const defaultLoadSettings = {
    shared: null,
    stared: false,
    deleted: false,
    parentFolder: null,
    contentType: 'all'
}; // loadDashboard action load all files and folders to dashboard
export function loadDashboard(customLoadSettings) {
    return async (dispatch, getState) => {
        // override defaultLoadSettings with customLoadSettings. loadSettings will use for configure filterParams object
        const loadSettings = { ...defaultLoadSettings, ...customLoadSettings };
        const filterParams = { parentFolder: null, deleted: false };
        const userId = getState().auth.userId;

        // if wished shared items then set userId to sharedUser and don't pass author else pass only author
        if (loadSettings.shared) {
            filterParams['sharedUser'] = userId;
        }
        else {
            filterParams['author'] = userId;
        }

        // stare feature stored on database as many to many field. We need loof for which files have this userId in
        // stared users. So we need pass userId as below
        // unlike files, folders look for only boolean value of stared property
        // we need delete author when look for stared items. Because the user can stared others files which shared with
        // him. So that mean he's not the author of these files.
        if (loadSettings.stared) {
            filterParams['staredUser'] = userId;
            filterParams['stared'] = true;
            delete filterParams['author']
        }

        if (loadSettings.deleted) {
            filterParams['deleted'] = true;
        }


        if (loadSettings.parentFolder) {
            filterParams['parentFolder'] = loadSettings.parentFolder;
        } 
        // parentFolder property came with deafultLoadSettings object. If the noParentFolder key is true in loadSettings then
        // delete parentFolder key. It will required when load deleted and shared folders.
        // Because there is a need ignore parent folders
        else if (loadSettings.noParentFolder) {
            delete filterParams['parentFolder'];
        }
        // if parentFolder value is null then set parentFolderNull key as true. Because the querystring can't hold null info
        else if (loadSettings.parentFolder === null) {
            filterParams['parentFolderNull'] = true;
        }

        const resultParams = { params: filterParams }

        dispatch(setSelected(null, null));
        dispatch(setLoadingAction(true));
        if (loadSettings.contentType === 'all') {
            const fileResponse = await iaxios.get('/filelist/', resultParams);
            const folderResponse = await iaxios.get('/folderlist/', resultParams);
            dispatch(setFilesAction(fileResponse.data));
            dispatch(setFoldersAction(folderResponse.data));
        }
        else if (loadSettings.contentType === 'file') {
            const fileResponse = await iaxios.get('/filelist/', resultParams);
            dispatch(setFilesAction(fileResponse.data));
            dispatch(setFoldersAction({}));
        }
        else if (loadSettings.contentType === 'folder') {
            const folderResponse = await iaxios.get('/folderlist/', resultParams);
            dispatch(setFilesAction({}));
            dispatch(setFoldersAction(folderResponse.data));
        }

        dispatch(loadTotalSize());
        dispatch(setLoadingAction(false));
    }
}

function addFolderAction(newFolder) {
    return {
        type: ADD_FOLDER,
        newFolder
    };
};

export function addFolder(folderName, parentFolderId) {
    return dispatch => {
        iaxios.post('/folderlist/', { name: folderName, folder: parentFolderId })
            .then(response => {
                dispatch(addFolderAction(response.data));
            });
    };
};

export function addFileAction(newFile) {
    return {
        type: ADD_FILE,
        newFile
    };
};

function deleteFolderAction(deletedFolderId) {
    return {
        type: DELETE_FOLDER,
        deletedFolderId
    };
};

function deleteFileAction(deletedFileId) {
    return {
        type: DELETE_FILE,
        deletedFileId
    };
};


export function deleteSelected() {
    return (dispatch, getState) => {
        const { selectedId, selectedItemType } = getState().drive;
        if (selectedItemType === 'folder') {
            iaxios.delete(`/folderlist/${selectedId}/`)
                .then(response => {
                    dispatch(deleteFolderAction(selectedId));
                    dispatch(setSelected(null, null));
                });
        }
        else if (selectedItemType === 'file') {
            iaxios.delete(`/filelist/${selectedId}/`)
                .then(response => {
                    dispatch(deleteFileAction(selectedId));
                    dispatch(setSelected(null, null));
                    dispatch(loadTotalSize());
                });
        }
    };
};


function setStarFileAction(fileId, newStarStatus) {
    return {
        type: STAR_FILE,
        fileId,
        newStarStatus
    };
};

function setStarFolderAction(folderId, newStarStatus) {
    return {
        type: STAR_FOLDER,
        folderId,
        newStarStatus
    };
};


export function starSelected() {
    return (dispatch, getState) => {
        const { selectedId, selectedItemType, files, folders } = getState().drive;
        if (selectedItemType === 'folder') {
            const selectedFolder = folders.find(folder => folder.id === selectedId);
            // it's toggle action actually. There is need to specify to what is the previous stared value of selected item
            const staredStatus = selectedFolder.stared;
            iaxios.patch(`/folderlist/${selectedId}/`, { stared: !staredStatus }) // pass stared value as opposite value
                .then(response => {
                    dispatch(setStarFolderAction(selectedId, response.data.stared));
                });
        }
        else if (selectedItemType === 'file') {
            const selectedFile = files.find(file => file.id === selectedId);
            const staredStatus = selectedFile.stared;
            iaxios.put(`/filelist/${selectedId}/filestar/`, { stared: !staredStatus })
                .then(response => {
                    dispatch(setStarFileAction(selectedId, response.data.stared));
                });
        }
    };
};

// restore deleted item
export function restore() {
    return (dispatch, getState) => {
        const { selectedId, selectedItemType } = getState().drive;
        if (selectedItemType === 'folder') {
            iaxios.patch(`/folderlist/${selectedId}/`, {deleted: false})
                .then(response => {
                    dispatch(deleteFolderAction(selectedId));
                    // if don't delete selected when switch to dashboard after restore you will see that file is selected
                    dispatch(setSelected(null, null));
                });
        }
        else if (selectedItemType === 'file') {
            iaxios.patch(`/filelist/${selectedId}/`, {deleted: false})
                .then(response => {
                    dispatch(deleteFileAction(selectedId));
                    dispatch(setSelected(null, null));
                });
        }
    };
};