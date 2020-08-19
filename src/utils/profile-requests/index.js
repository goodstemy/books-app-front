import {get} from '../index';

export function getProfile() {
    return get('/user/profile', {});
}
