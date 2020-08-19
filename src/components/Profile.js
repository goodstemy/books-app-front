import React from 'react';

import {UserContext} from '../store/user-store';

function Profile() {
    return (
        <UserContext.Consumer>
            {({username}) => (
                <center>
                    <p> Username: {username}</p>
                </center>
            )}
        </UserContext.Consumer>
    );
}

export default Profile;
