import React from 'react';
import { Link } from '@reach/router';
import { Button } from '@material-ui/core';
import Login from './Login';
import Logout from './Logout';

const styles = {
  root: {
    flexGrow: 1,
  }
};

const Sidebar = props => {
  const { username, changeLoginState } = props;
  return (
    <div styles={styles.root}>
      {!username && <Login changeLoginState={changeLoginState} />}
      {username && <Logout changeLoginState={changeLoginState} username={username} />}
      <Button component={Link} to='/submit' color='inherit'> Create Post</Button>
      <br />
      <Button component={Link} to='/newtopic' color='inherit'>New Topic</Button>
    </div >
  );
};

export default Sidebar;