import React, { Component } from 'react';
import * as api from '../api';
import { Button, Input } from '@material-ui/core';

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
      margin: theme.spacing.unit
    },
  });

  render() {
    const { usernameInput, failedLoginAttempt } = this.state;
    return (
      <div styles={this.styles.container}>
        <form onSubmit={this.handleSubmit}>
          <Input
            styles={this.styles.input}
            type='text'
            value={usernameInput}
            placeholder='Username'
            onChange={this.handleChange}
            id='usernameInput' />
          <br />
          <Button type='submit' color='inherit'>Sign In</Button>
        </form>
        {failedLoginAttempt && <alert>Incorrect username</alert>}
      </div>
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.login(this.state.usernameInput)
  }

  handleChange = (event) => {
    this.setState(({ [event.target.id]: event.target.value }))
  }

  updateCurrState = (failedLoginAttempt) => {
    this.setState(() => {
      return { failedLoginAttempt };
    })
  }

  login = (username) => {
    const { changeLoginState } = this.props;
    api.fetchUser(username)
      .then(({ user }) => {
        const userId = user.user_id;
        changeLoginState({ username, userId })
        this.updateCurrState(false)
      })
      .catch(err => {
        this.updateCurrState(true)
      })
  }
}

export default Login;