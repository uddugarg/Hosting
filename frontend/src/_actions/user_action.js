import axios from 'axios';
import {
    AUTH_USER,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER
} from './types';

export function registerUser(submit){
    const request = axios.post('/api/user/register', submit)
    .then(response => response.data);

    return{
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(submit){
    const request = axios.post('/api/user/login', submit)
    .then(response => response.data);

    return{
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(submit){
    const request = axios.get('/api/user/auth')
    .then(response => response.data);

    return{
        type: AUTH_USER,
        payload: request
    }
}

export function logout(submit){
    const request = axios.get('/api/user/logout')
    .then(response => response.data);

    return{
        type: LOGOUT_USER,
        payload: request
    }
}