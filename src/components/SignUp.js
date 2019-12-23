import React from 'react';
import {Redirect} from 'react-router-dom';

class SignUp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            passwordConfirm: '',
        };

        this.signUp = this.signUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(this);
    }

    signUp() {
        const body = {
            username: this.state.username,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm,
        };

        fetch('http://localhost:3001/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(body)
        })
        .then(async (response) => {
            if (!response.ok) {
                const {error} = await response.json();

                return alert(error);
            }

            console.log(response);
        })
        .catch((error) => {
            console.error(error);
        });
    }

    handleSubmit(event) {
        this.signUp();
        event.preventDefault();
    }

    handleUsernameChange(event) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event) {
        this.setState({ password: event.target.value });
    }

    handlePasswordConfirmChange(event) {
        this.setState({ passwordConfirm: event.target.value });
    }

    render() {
        if (this.props.isAuthorized) {
            return <Redirect to={{pathname: '/profile'}}/>
        }

        return (
            <div className="row center-xs">
                <div className="col-xs">
                    <form className="login" onSubmit={this.handleSubmit}>
                        <input type="text" placeholder="Никнейм" id="username" name="username" value={this.state.username} onChange={this.handleUsernameChange} />
                        <br/>
                        <input type="password" placeholder="Пароль" id="password" name="password" value={this.state.password} onChange={this.handlePasswordChange} />
                        <br/>
                        <input type="password" placeholder="Пароль еще раз" id="password-confirm" name="password-confirm" value={this.state.passwordConfirm} onChange={this.handlePasswordConfirmChange} />
                        <br/>
                        <input className="submitButton" type="submit" value="Войти" />
                    </form>
                </div>
            </div>
        )
    }
}

export default SignUp;
