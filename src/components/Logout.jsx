import React from 'react';
import { Link } from '@reach/router';
import { Button, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    float: 'right',
  },
});

const Logout = (props) => {
  const { username, changeLoginState, classes } = props;

  return (
    <div className={classes.root}>
      <Button color="secondary" component={Link} to={`/users/${username}`}>{username}</Button>
      <Button color="secondary" onClick={() => changeLoginState({ username: undefined, user_id: undefined })}>Logout</Button>
    </div>
  );
};

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  changeLoginState: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Logout);
