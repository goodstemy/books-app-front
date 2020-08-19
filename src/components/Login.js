import React, { useEffect, useState } from 'react';
import {
    withRouter,
} from "react-router-dom";

const {login} = require('../utils/authentication-requests');

let authenticateHandler = null;

function authenticate(username, password, history) {
    login(username, password)
        .then(async response => {
            const {user, token} = response;

            if (!user || !token) {
                return alert('Login failed');
            }

            document.setCookie('token', token);

            authenticateHandler(user);

            history.push('/profile');
        })
        .catch(error => {
            console.error(error);
        });
}

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    authenticateHandler = props.authenticateHandler;

    useEffect(() => {
        const {isAuthorized, history} = props;

        if (isAuthorized) {
            history.push('/profile');
        }
    }, []);

    return (
        <div className="row center-xs">
            <div className="col-xs">
                <form className="login" onSubmit={(e) => {
                    authenticate(username, password, props.history);
                    e.preventDefault();
                }}>
                    <input type="text" placeholder="Никнейм" id="username" name="username"
                           value={username} onChange={e => setUsername(e.target.value)}/>
                    <br/>
                    <input type="password" placeholder="Пароль" id="password" name="password"
                           value={password} onChange={e => setPassword(e.target.value)}/>
                    <br/>
                    <input className="submitButton" type="submit" value="Войти"/>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Login);
