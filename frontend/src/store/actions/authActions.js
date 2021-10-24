

import iaxios from './../../iaxios';


import {
    SET_TOKEN
} from './actionTypes';


function setAuthParams(token, username) {
    if (token) {
        iaxios.defaults.headers.common['Authorization'] = `Token ${token}`
    }
    else {
        delete iaxios.defaults.headers.common['Authorization']
    }
    return {
        token: token,
        username: username,
        type: SET_TOKEN
    };
}

export function login(input, password) {
    return dispatch => {
        iaxios.post('/auth/login/', {input, password})
        .then(response => {
            const {username, token} = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('username', username)
            dispatch(setAuthParams(token, username));
        })
    }
}

export function logout() {
    return dispatch => {
        iaxios.post('/auth/logout/')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(setAuthParams(null));
    }
}

export function register(username, email, password) {
    return dispatch => {
        iaxios.post('/auth/register/', {username, email, password})
        .then(response => {
            const {username, token} = response.data
            localStorage.setItem('token', token)
            localStorage.setItem('token', username)
            dispatch(setAuthParams(token, username));
        })
    }
}

export function checkAuth() {
    return dispatch => {
        const token = localStorage.getItem('token')
        const username = localStorage.getItem('username')
        if (token) {
            dispatch(setAuthParams(token, username));
        }
    }
}