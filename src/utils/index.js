import {useState, useEffect} from 'react';
import {BACKEND_URL} from "../constants";

export function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(
        () => {
            const handler = setTimeout(() => {
                setDebouncedValue(value);
            }, delay);

            return () => {
                clearTimeout(handler);
            };
        },
        [value]
    );

    return debouncedValue;
}

export function request({
                            url,
                            method,
                            body = {},
                        }) {
    const reqObject = {
        method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
    };

    if (document.getCookie('token')) {
        reqObject.headers['Authorization'] = `Bearer ${document.getCookie('token') || ''}`;
    }

    if (method === 'POST') {
        reqObject.body = JSON.stringify(body);
    }

    return new Promise((resolve, reject) => {
        fetch(`${BACKEND_URL}${url}`, reqObject)
            .then(async response => {
                if (response.status !== 200) {
                    const {error} = await response.json();

                    return reject(error);
                }

                resolve(response.json());
            })
            .catch(error => {
                reject(error);
            });
    });
}

export function get(url) {
    return request({
        url,
        method: 'GET',
    })
}

export function post(url, body) {
    return request({
        url,
        body,
        method: 'POST',
    });
}
