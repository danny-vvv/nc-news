import React, { Component } from 'react';
import {
  Button, withStyles, Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, Typography,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import * as api from '../api';

const styles = () => ({
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
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

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
        const { user_id } = user;
        this.handleClose();
        changeLoginState({ username, user_id });
      })
      .catch((err) => {
        if (err) this.setState({ failedLoginAttempt: true });
      });
  }

  render() {
    const {
      usernameInput, failedLoginAttempt, open,
    } = this.state;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Log In
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Log In</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'Try using \'jessjelly\' or any other username you see around the site. Don\'t worry, these aren\'t real users!'}
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
      </div>
    );
  }
}

Login.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Login);
