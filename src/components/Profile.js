import React from 'react';
import {
  Redirect,
} from "react-router-dom";

class Profile extends React.Component {
  render() {
    if (!this.props.isAuthorized) {
      return <Redirect to={{pathname: '/login'}}/>
    }

    return (
      <p>{this.props.user.username}</p>
    )
  }
}

export default Profile;
