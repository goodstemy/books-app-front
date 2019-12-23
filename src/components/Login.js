import React from 'react';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };

    this.authenticate = this.authenticate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  authenticate() {
    const body = {
      username: this.state.username,
      password: this.state.password,
    };

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(body)
    })
    .then(async (response) => {
      if (response.status !== 200) {
        const {error} = await response.json();

        return alert(error);
      }

      const {user, token} = await response.json();

      document.setCookie('token', token);

      this.props.authenticateHandler(user);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  handleSubmit(event) {
    this.authenticate();
    event.preventDefault();
  }

  handleUsernameChange(event) {
    this.setState({ username: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
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
            <input className="submitButton" type="submit" value="Войти" />
          </form>
        </div>
      </div>
    )
  }
}

export default Login;
