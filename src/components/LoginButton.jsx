import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import LoginDialogue from './LoginDialogue';

class LoginButton extends Component {
  state = {
    open: false,
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { open } = this.state;
    const { changeLoginState, buttonText } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          {buttonText}
        </Button>
        {open && <LoginDialogue changeLoginState={changeLoginState} resetLoginPrompt={this.handleClose} />}
      </div>
    );
  }
}

LoginButton.propTypes = {
  changeLoginState: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

LoginButton.defaultProps = {
  buttonText: 'Log In',
};

export default LoginButton;
