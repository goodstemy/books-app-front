import {post} from '../index';

export function login(username, password) {
    return post(`/auth/login`, {
        username,
        password,
    });
}

export function signUp(username, password, passwordConfirm) {
    return post(`/auth/signup`, {
        username,
        password,
        passwordConfirm,
    });
}
