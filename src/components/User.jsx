import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../api';

class User extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { username, setHeading } = this.props;
    this.fetchUser(username);
    setHeading(`User: ${username}`);
  }

  fetchUser(username) {
    api.fetchUser(username)
      .then(({ user }) => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    const { username, avatar_url, name } = user;
    return (
      <div className="User">
        <img src={avatar_url} alt={`${username}'s avatar`} />
        <p>
Username:
          {' '}
          {username}
        </p>
        <p>
Real name:
          {' '}
          {name}
        </p>
      </div>
    );
  }
}

User.propTypes = {
  username: PropTypes.string,
  setHeading: PropTypes.func.isRequired,
};

User.defaultProps = {
  username: '',
};

export default User;
