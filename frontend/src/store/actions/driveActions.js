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

const defaultLoadSettings = {
    shared: null,
    stared: false,
    deleted: false,
    parentFolder: null,
    contentType: 'all'
};
export function loadDashboard(customLoadSettings) {
    return async (dispatch, getState) => {
        const loadSettings = { ...defaultLoadSettings, ...customLoadSettings };
        const filterParams = { parentFolder: null, deleted: false };
        const authId = getState().auth.authId;

        if (loadSettings.shared) {
            filterParams['sharedUser'] = authId;
        }
        else {
            filterParams['author'] = authId;
        }

        if (loadSettings.stared) {
            filterParams['staredUser'] = authId;
            filterParams['stared'] = true;
            delete filterParams['author']
        }

        if (loadSettings.deleted) {
            filterParams['deleted'] = true;
        }

        if (loadSettings.parentFolder) {
            filterParams['parentFolder'] = loadSettings.parentFolder;
        }
        else if (loadSettings.noParentFolder) {
            delete filterParams['parentFolder']
        }
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
            })
    }
}

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
        const { selectedId, selectedItemType } = getState().drive
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
                    dispatch(deleteFileAction(selectedId))
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
        const { selectedId, selectedItemType, files, folders } = getState().drive
        if (selectedItemType === 'folder') {
            const selectedFolder = folders.find(folder => folder.id === selectedId);
            const staredStatus = selectedFolder.stared
            iaxios.patch(`/folderlist/${selectedId}/`, { stared: !staredStatus })
                .then(response => {
                    dispatch(setStarFolderAction(selectedId, response.data.stared));
                })
        }
        else if (selectedItemType === 'file') {
            const selectedFile = files.find(file => file.id === selectedId);
            const staredStatus = selectedFile.stared
            iaxios.put(`/filelist/${selectedId}/filestar/`, { stared: !staredStatus })
                .then(response => {
                    dispatch(setStarFileAction(selectedId, response.data.stared));
                })
        }
    }
}


export function restore() {
    return (dispatch, getState) => {
        const { selectedId, selectedItemType } = getState().drive;
        if (selectedItemType === 'folder') {
            iaxios.patch(`/folderlist/${selectedId}/`, {deleted: false})
                .then(response => {
                    dispatch(deleteFolderAction(selectedId));
                    dispatch(setSelected(null, null));
                });
        }
        else if (selectedItemType === 'file') {
            iaxios.patch(`/filelist/${selectedId}/`, {deleted: false})
                .then(response => {
                    dispatch(deleteFileAction(selectedId))
                    dispatch(setSelected(null, null));
                });
        }
    }
}