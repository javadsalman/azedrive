import {
    SET_TOKEN
} from '../actions/actionTypes';

const initialState = {
    token: false,
    username: '',
    userId: null,
};

const setAuthParams = (state, action) => {
    return {...state, token: action.token, username: action.username, userId: action.userId}
};

function authReducer(state=initialState, action) {
    switch(action.type) {
        case SET_TOKEN: return setAuthParams(state, action);
        default: return state;
    }
};

export default authReducer;