import React, { Component } from 'react';
import * as api from '../api';
import './User.css';

class User extends Component {
  state = {
    user: {}
  }
  render() {
    console.log(this.state.user)
    const { user } = this.state;
    const { username, avatar_url, name } = user;
    return (
      <div>
        <img src={avatar_url} alt={`${username}'s avatar`}></img>
        <p>Username: {username}</p>
        <p>Real name: {name}</p>
      </div>
    );
  }

  componentDidMount() {
    this.fetchUser(this.props.username)
  }

  fetchUser(username) {
    api.fetchUser(username)
      .then(user => this.setState({ user: user }))
  }
}

export default User;