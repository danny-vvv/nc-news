import React, { Component } from 'react';
import * as api from '../api';

class Login extends Component {
  state = {
    usernameInput: '',
    successfulLoginAttempt: false,
    failedLoginAttempt: false,
  }

  render() {
    const { usernameInput, successfulLoginAttempt, failedLoginAttempt } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type='text' value={usernameInput} onChange={this.handleChange} id='usernameInput' />
          </label>
          <button type='submit'>Login</button>
        </form>
        {successfulLoginAttempt && <p>Welcome, {usernameInput}!</p>}
        {failedLoginAttempt && <p>Login failed</p>}
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

  updateCurrState = (successfulLoginAttempt, failedLoginAttempt) => {
    this.setState(() => {
      return { successfulLoginAttempt, failedLoginAttempt };
    })
  }

  login = (username) => {
    const { changeLoginState } = this.props;
    api.fetchUser(username)
      .then(({ user }) => {
        changeLoginState(username, user.user_id)
        const loginData = {
          loggedIn: true,
          username: username
        }
        localStorage.setItem('loginData', JSON.stringify(loginData))
        this.updateCurrState(true, false)
      })
      .catch(err => {
        this.updateCurrState(false, true)
      })
  }
}

export default Login;