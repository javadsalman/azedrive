import { LocalStorageAuthUtil } from './utils';
import iaxios from './../../iaxios';


import {
    SET_TOKEN
} from './actionTypes';

// get instance of LocalStorageAuthUtil to using for storage operations
const ls = new LocalStorageAuthUtil();


function setAuthParams(authData) {
    // if authData exists and has token then set that token as default heador to axios instance
    // With this way we wont need pass token for each request.
    // if authData doesn't exist then delete default header of iaxios
    if (authData && authData.token) {
        iaxios.defaults.headers.common['Authorization'] = `Token ${authData.token}`;
    }
    else if (authData === null) {
        delete iaxios.defaults.headers.common['Authorization'];
    }
    return {
        ...authData,
        type: SET_TOKEN
    };
}

export function login(input, password) {
    return dispatch => {
        iaxios.post('/auth/login/', {input, password})
        .then(response => {
            const {username, token, id} = response.data;
            ls.setItems({username, token, userId: id});
            dispatch(setAuthParams({token, username, userId: id}));
        });
    };
}

export function logout() {
    return dispatch => {
        dispatch(setAuthParams(null));
        iaxios.post('/auth/logout/');
        ls.removeItems('username', 'token', 'userId');
    };
};

export function register(username, email, password) {
    return dispatch => {
        iaxios.post('/auth/register/', {username, email, password})
        .then(response => {
            const {username, token, id} = response.data;
            ls.setItems({username, token, userId: id});
            dispatch(setAuthParams({token, username, userId: id}));
        });
    };
};

// get auth data from local storage and set as auth params
export function checkAuth() {
    return dispatch => {
        const authData = ls.getItems();
        if (authData.token) {
            dispatch(setAuthParams(authData));
        }
        else {
            dispatch(setAuthParams(null));
        }
    };
};