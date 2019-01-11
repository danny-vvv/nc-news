import React, { Component } from 'react';
import * as api from '../api';

class Login extends Component {
  state = {
    usernameInput: '',
    failedLoginAttempt: false,
  }

  render() {
    const { usernameInput, failedLoginAttempt } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type='text' value={usernameInput} onChange={this.handleChange} id='usernameInput' />
          </label>
          <button type='submit'>Login</button>
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