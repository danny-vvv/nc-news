import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { navigate } from '@reach/router';
import LoginDialogue from './LoginDialogue';

class ControlsMenu extends Component {
  state = {
    anchorEl: null,
    selected: null,
    promptLogin: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const { selected } = this.state;
    const { username } = this.props;
    if (selected && selected !== prevState.selected) {
      if (username) {
        this.navigateToSelected();
      }
    }
    if (username && selected && username !== prevProps.username) {
      this.navigateToSelected();
    }
  }

  resetLoginPrompt = () => {
    this.setState({ promptLogin: false });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget, promptLogin: false });
  };

  handleClose = (event) => {
    const selected = event.target.id;
    const { username } = this.props;
    this.setState({ anchorEl: null });
    if (selected) {
      if (username) {
        this.setState({ selected });
      } else {
        this.setState({ selected, promptLogin: true });
      }
    }
  };

  navigateToSelected() {
    const { selected } = this.state;
    navigate(`${selected}`);
    this.setState({
      anchorEl: null,
      selected: null,
      promptLogin: false,
    });
  }

  render() {
    const { anchorEl, promptLogin } = this.state;
    const { changeLoginState } = this.props;
    const options = [{ name: 'Create Post', path: '/submit' }, { name: 'New Topic', path: '/newtopic' }];
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuIcon />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {options.map(option => (
            <MenuItem
              key={option.name}
              id={option.path}
              onClick={this.handleClose}
            >
              {option.name}
            </MenuItem>
          ))}
        </Menu>
        {promptLogin && (
        <LoginDialogue
          changeLoginState={changeLoginState}
          resetLoginPrompt={this.resetLoginPrompt}
        />
        )}
      </div>
    );
  }
}

ControlsMenu.propTypes = {
  username: PropTypes.string,
  changeLoginState: PropTypes.func.isRequired,
};

ControlsMenu.defaultProps = {
  username: undefined,
};

export default ControlsMenu;
