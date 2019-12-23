export function addCookieHelpers() {
    document.getCookie = (name) => {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    };

    document.setCookie = (name, value, options = {}) => {
        options = {
            path: '/',
            expires: 86400,
            ...options
        };

        if (options.expires.toUTCString) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    };

    document.deleteCookie = (name) => {
        document.setCookie(name, "", {
            'max-age': -1
        });
    }
}
