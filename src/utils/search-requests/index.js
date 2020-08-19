import {post} from '../index';

export function postSearchText({
                                   searchText,
                                   username,
                               }) {
    return post('/search', {
        searchText,
        username,
    });
}
