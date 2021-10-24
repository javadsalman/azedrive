


import {
    SET_TOKEN
} from '../actions/actionTypes';

const initialState = {
    token: null,
    username: '',
}

const setAuthParams = (state, action) => {
    return {...state, token: action.token, username: action.username}
}

function authReducer(state=initialState, action) {
    switch(action.type) {
        case SET_TOKEN: return setAuthParams(state, action);
        default: return state;
    }
}

export default authReducer;