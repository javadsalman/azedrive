import { 
    SET_LOADING, 
    SET_SELECTED, 
    SET_FILES, 
    SET_FOLDERS, 
    ADD_FOLDER, 
    ADD_FILE, 
    DELETE_FOLDER, 
    DELETE_FILE, 
    STAR_FOLDER, 
    STAR_FILE, 
    SET_TOTAL_SIZE 
} from './../actions/actionTypes';

const initialState = {
    selectedId: '',
    selectedItemType: '',
    loading: false,
    totalSize: null,
    totalSizeLimit: null,
    folders: [
    ],
    files: [
    ],
};

const setSelected = (state, action) => {
    return {...state, selectedId: action.id, selectedItemType: action.itemType};
};

const setLoading = (state, action) => {
    return {...state, loading: action.loadingValue};
};

const setTotalSize = (state, action) => {
    return {...state, totalSize: action.totalSize, totalSizeLimit: action.totalSizeLimit};
};

const setFiles = (state, action) => {
    return {...state, files: action.files};
};

const setFolders = (state, action) => {
    return {...state, folders: action.folders};
};

const addFile = (state, action) => {
    return {...state, files: [...state.files, action.newFile]};
};
const addFolder = (state, action) => {
    return {...state, folders: [...state.folders, action.newFolder]};
};

const deleteFile = (state, action) => {
    return {...state, files: state.files.filter(file => file.id !== action.deletedFileId)};
};
const deleteFolder = (state, action) => {
    return {...state, folders: state.folders.filter(folder => folder.id !== action.deletedFolderId)};
};

const setStarFile = (state, action) => {
    const newFiles = state.files.map(file => {
        if (file.id === action.fileId) {
            file.stared = action.newStarStatus;
            return file;
        } else {
            return file;
        }
    });
    return {...state, files: newFiles };
};

const setStarFolder = (state, action) => {
    const newFolders = state.folders.map(folder => {
        if (folder.id === action.folderId) {
            folder.stared = action.newStarStatus;
            return folder;
        } else {
            return folder
        }
    });
    return {...state, folders: newFolders};
}

function driveReducer(state=initialState, action) {
    switch(action.type) {
        case SET_SELECTED: return setSelected(state, action);
        case SET_LOADING: return setLoading(state, action);
        case SET_TOTAL_SIZE:  return setTotalSize(state, action);
        case SET_FILES: return setFiles(state, action);
        case SET_FOLDERS: return setFolders(state, action);
        case ADD_FOLDER: return addFolder(state, action);
        case ADD_FILE: return addFile(state, action);
        case DELETE_FOLDER: return deleteFolder(state, action);
        case DELETE_FILE: return deleteFile(state, action);
        case STAR_FILE: return setStarFile(state, action);
        case STAR_FOLDER: return setStarFolder(state, action);
        default: return state;
    }
}

export default driveReducer;