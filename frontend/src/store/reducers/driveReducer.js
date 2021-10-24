
import { TOGGLE_SELECT } from './../actions/actionTypes';
const initialState = {
    selected: '',
    totalStorage: 120,
    loading: false,
    folders: [
        {
            id: 'folder-1',
            name: 'Şəkillər',
            stared: true,
        },
        {
            id: 'folder-2',
            name: 'Kitablar',
            stared: true,
        },
        {
            id: 'folder-3',
            name: 'Mahnilar',
            stared: false,
        },
        {
            id: 'folder-4',
            name: 'Senedler',
            stared: false,
        },
        {
            id: 'folder-5',
            name: 'Dersler',
            stared: false,
        },
    ],
    files: [
        {
            id: 'file-1',
            name: 'Turlerin Kökeni.pdf',
            type: 'pdf',
            stared: true,
        },
        {
            id: 'file-2',
            name: 'Otostopçunun Galaksi Rehberi.pdf',
            type: 'pdf',
            stared: false,
        },
        {
            id: 'file-3',
            name: 'Referat Slayt.ppt',
            type: 'ppt',
            stared: false,
        },
        {
            id: 'file-4',
            name: 'Hesablamalar.xml',
            type: 'xml',
            stared: true,
        },
        {
            id: 'file-5',
            name: 'Notlar.txt',
            type: 'txt',
            stared: false,
        },
    ],
}

const toggleSelect = (state, action) => {
    console.log('reducere girir')
    if (state.selected === action.id) {
        return {...state, selected: null};
    }
    else {
        return {...state, selected: action.id}
    }
}


function driveReducer(state=initialState, action) {
    switch(action.type) {
        case TOGGLE_SELECT: return toggleSelect(state, action);
        default: return state;
    }
}

export default driveReducer;