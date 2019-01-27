import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, DialogTitle, DialogContent, DialogContentText, TextField, Typography, DialogActions, Button,
} from '@material-ui/core';
import * as api from '../api';


class LoginDialogue extends Component {
  state = {
    usernameInput: '',
    failedLoginAttempt: false,
    open: false,
  }

  componentDidMount() {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { usernameInput } = this.state;
    this.login(usernameInput);
  }

  handleChange = (event) => {
    this.setState(({ usernameInput: event.target.value, failedLoginAttempt: false }));
  }

  login = (username) => {
    const { changeLoginState } = this.props;
    api.fetchUser(username)
      .then(({ user }) => {
        const {
          user_id, avatar_url, name,
        } = user;
        this.handleClose();
        changeLoginState({
          user_id, username, avatar_url, name,
        });
      })
      .catch((err) => {
        if (err) this.setState({ failedLoginAttempt: true });
      });
  }

  render() {
    const { open, usernameInput, failedLoginAttempt } = this.state;
    const { resetLoginPrompt } = this.props;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        onExit={resetLoginPrompt}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {'Try using \'jessjelly\' or any other username you see around the site. All accounts are test accounts and do not belong to anyone.'}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            onChange={this.handleChange}
            value={usernameInput}
            label="Username"
            type="text"
            fullWidth
            error={failedLoginAttempt}
          />
          {failedLoginAttempt && (
            <Typography variant="caption">
              Incorrect username
              {' '}
              <i>{'(Did you try \'jessjelly\'?)'}</i>
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <form onSubmit={this.handleSubmit}>
            <Button type="submit" onClick={this.handleSubmit} color="primary">
              Log In
            </Button>
          </form>
          <Button onClick={this.handleClose} color="primary">
              Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

LoginDialogue.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
  resetLoginPrompt: PropTypes.func,
};

LoginDialogue.defaultProps = {
  resetLoginPrompt: undefined,
};

export default LoginDialogue;
