import { 
    TOGGLE_SELECT
} from './actionTypes';


export function toggleSelect(id) {
    return {
        type: TOGGLE_SELECT,
        id: id,
    };
};

export function setLoading() {

}