import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

const ITEM_HEIGHT = 48;

class TopicsMenu extends React.Component {
  state = {
    anchorEl: null,
    selection: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { selection } = this.state;
    if (selection !== prevState.selection) {
      navigate(`/topics/${selection}`);
    }
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (event) => {
    const selected = event.target.id;
    this.setState({ anchorEl: null });
    if (selected) {
      this.setState({ selection: selected });
    }
  };

  render() {
    const { anchorEl } = this.state;
    const { options } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
          {options.map(option => (
            <MenuItem key={option} id={option} onClick={this.handleClose}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

TopicsMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TopicsMenu;
