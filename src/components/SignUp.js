import React, { useState } from 'react';
import {withRouter} from 'react-router-dom';

import {signUp as signUpRequest} from "../utils/authentication-requests";

function signUp(username, password, passwordConfirm) {
    return signUpRequest(username, password, passwordConfirm);
}

function SignUp({history}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    return (
        <div className="row center-xs">
            <div className="col-xs">
                <form className="login" onSubmit={(event) => {
                    signUp(username, password, passwordConfirm)
                        .then(() => history.push('/login'))
                        .catch(error => console.error(error));

                    event.preventDefault();
                }}>
                    <input type="text" placeholder="Никнейм" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} />
                    <br/>
                    <input type="password" placeholder="Пароль" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
                    <br/>
                    <input type="password" placeholder="Пароль еще раз" id="password-confirm" name="password-confirm" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} />
                    <br/>
                    <input className="submitButton" type="submit" value="Войти" />
                </form>
            </div>
        </div>
    )
}

export default withRouter(SignUp);
