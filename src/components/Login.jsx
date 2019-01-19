import React, { Component } from 'react';
import { Button, Input } from '@material-ui/core';
import PropTypes from 'prop-types';
import * as api from '../api';

class Login extends Component {
  state = {
    usernameInput: '',
    failedLoginAttempt: false,
  }

  styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    input: {
      margin: theme.spacing.unit,
    },
  });

  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameInput } = this.state;
    this.login(usernameInput);
  }

  handleChange = (event) => {
    this.setState(({ [event.target.id]: event.target.value }));
  }

  updateCurrState = (failedLoginAttempt) => {
    this.setState(() => ({ failedLoginAttempt }));
  }

  login = (username) => {
    const { changeLoginState } = this.props;
    api.fetchUser(username)
      .then(({ user }) => {
        const userId = user.user_id;
        changeLoginState({ username, userId });
      })
      .catch(this.updateCurrState(true));
  }

  render() {
    const { usernameInput, failedLoginAttempt } = this.state;
    return (
      <div styles={this.styles.container}>
        <form onSubmit={this.handleSubmit}>
          <Input
            styles={this.styles.input}
            type="text"
            value={usernameInput}
            placeholder="Username"
            onChange={this.handleChange}
            id="usernameInput"
          />
          <br />
          <Button type="submit" color="primary">Sign In</Button>
        </form>
        {failedLoginAttempt && <alert>Incorrect username</alert>}
      </div>
    );
  }
}

Login.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
};

export default Login;
