import React from 'react';
import {addCookieHelpers} from './common';
import Menu from './components/Menu';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Profile from './components/Profile';
import ReadBook from './components/ReadBook';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);

    addCookieHelpers();

    this.state = {
      isLoaded: false,
      user: {},
      isAuthorized: false,
    };

    this.authenticateHandler = this.authenticateHandler.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    fetch('http://localhost:3001/profile', {
      method: 'GET',
      accept: '*/*',
      headers: {
        'Authorization': `Bearer ${document.getCookie('token') || ''}`
      }
    })
    .then(async response => {
      if (!response.ok) {
        return this.setState({
          user: {},
          isAuthorized: false,
          isLoaded: true
        });
      }

      const {user} = await response.json();

      this.setState({
        user,
        isAuthorized: true,
        isLoaded: true
      });
    })
    .catch(err => {
      console.error(err);

      this.setState({
        user: {},
        isAuthorized: false,
        isLoaded: true
      });
    });
  }

  authenticateHandler(user) {
    this.setState({
      user,
      isAuthorized: true,
    })
  }

  logout() {
    if (this.state.isAuthorized) {
      document.deleteCookie('token');

      this.setState({
        user: {},
        isAuthorized: false,
      });
    }
  }

  render() {
    return (
      <div className="App" style={{display: this.state.isLoaded ? 'block' : 'none'}}>
        <Router>
          <Menu isAuthorized={this.state.isAuthorized} logout={this.logout} user={this.state.user}/>

          <Switch>
            <Route exact path="/">
              <Home isAuthorized={this.state.isAuthorized}/>
            </Route>
            <Route path="/profile">
              <Profile isAuthorized={this.state.isAuthorized} user={this.state.user}/>
            </Route>
            <Route path="/login">
              <Login isAuthorized={this.state.isAuthorized} authenticateHandler={this.authenticateHandler}/>
            </Route>
            <Route path="/signup">
              <SignUp isAuthorized={this.state.isAuthorized}/>
            </Route>
            <Route path="/book">
              <ReadBook isAuthorized={this.state.isAuthorized}/>
            </Route>
            <Route path="*">
              <center>
                <h1>404 NOT FOUND</h1>
              </center>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
