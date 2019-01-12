import React, { Component } from 'react';
import * as api from '../api';
import './User.css';

class User extends Component {
  state = {
    user: {}
  }
  render() {
    const { user } = this.state;
    const { username, avatar_url, name } = user;
    return (
      <div className='User'>
        <img src={avatar_url} alt={`${username}'s avatar`}></img>
        <p>Username: {username}</p>
        <p>Real name: {name}</p>
      </div>
    );
  }

  componentDidMount() {
    const { username } = this.props;
    this.fetchUser(username)
    this.props.setHeading(`User: ${username}`)
  }

  fetchUser(username) {
    api.fetchUser(username)
      .then(({user}) => this.setState({ user: user }))
  }
}

export default User;