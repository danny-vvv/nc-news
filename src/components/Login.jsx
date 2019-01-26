import React, { Component } from 'react';
import {
  Button, Input, withStyles,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as api from '../api';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    float: 'right',
  },
  form: {
    display: 'flex',
  },
});

class Login extends Component {
  state = {
    usernameInput: '',
    failedLoginAttempt: false,
  }

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
        const { user_id } = user;
        changeLoginState({ username, user_id });
      })
      .catch(this.updateCurrState(true));
  }

  render() {
    const { usernameInput, failedLoginAttempt } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <Input
            type="text"
            value={usernameInput}
            placeholder="Username (e.g. 'jessjelly')"
            onChange={this.handleChange}
            id="usernameInput"
          />
          <Button type="submit" variant="contained" color="primary">Log In</Button>
        </form>
        {failedLoginAttempt && <alert>Incorrect username</alert>}
      </div>
    );
  }
}

Login.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Login);
