import React from 'react';

function Input({
                   placeholder = '',
                   changeHandler,
                   confirmHandler
               }) {
    return <input
        type="text"
        placeholder={placeholder}
        className="input"
        onKeyUp={e => {
            if (e.keyCode === 13) {
                return confirmHandler(e);
            }
        }
        }
        onChange={changeHandler}
    />;
}

export default Input;
