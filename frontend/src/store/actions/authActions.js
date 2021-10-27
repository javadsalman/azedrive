import { LocalStorageAuthUtil } from './utils';
import iaxios from './../../iaxios';


import {
    SET_TOKEN
} from './actionTypes';


const ls = new LocalStorageAuthUtil();


function setAuthParams(authData) {
    if (authData && authData.token) {
        iaxios.defaults.headers.common['Authorization'] = `Token ${authData.token}`
    }
    else if (authData === null) {
        delete iaxios.defaults.headers.common['Authorization']
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
            const {username, token, id} = response.data
            ls.setItems({username, token, authId: id});
            dispatch(setAuthParams({token, username, authId: id}));
        })
    }
}

export function logout() {
    return dispatch => {
        iaxios.post('/auth/logout/')
        ls.removeItems('username', 'token', 'authId')
        dispatch(setAuthParams(null));
    }
}

export function register(username, email, password) {
    return dispatch => {
        iaxios.post('/auth/register/', {username, email, password})
        .then(response => {
            const {username, token, id} = response.data
            ls.setItems({username, token, authId: id})
            dispatch(setAuthParams({token, username, authId: id}));
        })
    }
}

export function checkAuth() {
    return dispatch => {
        const authData = ls.getItems();
        if (authData.token) {
            dispatch(setAuthParams(authData));
        }
    }
}