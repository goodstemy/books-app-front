import {get, post} from '../index';

export function postTitle(username, title, bookId) {
    return post(`/books/title/${bookId}`, {
        username,
        title,
    });
}

export function getBookTitle(bookId) {
    return get(`/books/title/${bookId}`);
}

export function postContent(username, bookId, content) {
    return post(`/books/content/${bookId}`, {
        username,
        content,
    });
}

export function createBook(username, title, coverUrl) {
    return post(`/books/new`, {
        username,
        title,
        coverUrl,
    });
}

export function getOwnerBookContent(username, bookId) {
    return get(`/books/content/${username}/${bookId}`);
}

export function getBookContent(bookId) {
    return get(`/books/content/read/${bookId}`);
}

export function getBooks(username) {
    return get(`/books/${username}`);
}

export function addToReadBooks(username, bookId) {
    return post(`/books/rb_update`, {
        username,
        bookId,
    });
}
