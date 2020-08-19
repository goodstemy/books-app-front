import React, {useState, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import { ModalProvider } from "react-modal-hook";
import Modal from 'react-modal';
import Menu from './components/Menu';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Profile from './components/Profile';
import ReadBook from './components/ReadBook';
import WriteBook from './components/WriteBook';
import './App.css';
import {getProfile} from './utils/profile-requests';
import {UserContext} from './store/user-store';

function App() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        if (!document.getCookie('token')) {
            return setIsLoaded(true);
        }

        Modal.setAppElement(document.querySelector('.App'));

        getProfile()
            .then(async response => {
                const {user} = await response;

                setIsLoaded(true);
                setIsAuthorized(true);
                setUser(user);
            })
            .catch(error => {
                console.error(error);

                setIsLoaded(true);
            })
    }, []);

    if (isAuthorized) {
        return (
            <ModalProvider>
                <UserContext.Provider value={user}>
                    <div className="App" style={{display: isLoaded ? 'block' : 'none'}}>
                        <Router>
                            <Menu isAuthorized={isAuthorized} logout={() => {
                                document.deleteCookie('token');

                                setUser({});
                                setIsAuthorized({});

                                window.location.reload();
                            }} user={user}/>

                            <Switch>
                                <Route exact path="/">
                                    <Home isAuthorized={isAuthorized} username={user.username}/>
                                </Route>
                                <Route exact path="/profile">
                                    <Profile isAuthorized={isAuthorized}/>
                                </Route>
                                <Route exact path="/read/:id">
                                    <ReadBook isAuthorized={isAuthorized}/>
                                </Route>
                                <Route path="/write/:id">
                                    <WriteBook isAuthorized={isAuthorized} username={user.username}/>
                                </Route>
                                <Route exact path="/login">
                                    <Login isAuthorized={isAuthorized}
                                           authenticateHandler={user => {
                                               setUser(user);
                                               setIsAuthorized(true);
                                           }}/>
                                </Route>
                                <Route exact path="/signup">
                                    <SignUp isAuthorized={isAuthorized}/>
                                </Route>
                                <Route path="*">
                                    <center>
                                        <h1>404 NOT FOUND</h1>
                                    </center>
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </UserContext.Provider>
            </ModalProvider>
        )
    }

    return (
        <div className="App" style={{display: isLoaded ? 'block' : 'none'}}>
            <Router>
                <Menu isAuthorized={isAuthorized}  logout={() => {
                    console.log('WTF??? You are not logged in!')
                }}/>

                <Switch>
                    <Route exact path="/login">
                        <Login isAuthorized={isAuthorized}
                               authenticateHandler={user => {
                                   setUser(user);
                                   setIsAuthorized(true);
                               }}/>
                    </Route>
                    <Route exact path="/signup">
                        <SignUp isAuthorized={isAuthorized}/>
                    </Route>
                    <Route path="*">
                        <Login isAuthorized={false}
                               authenticateHandler={user => {
                                   setUser(user);
                                   setIsAuthorized(true);
                               }}/>
                    </Route>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
