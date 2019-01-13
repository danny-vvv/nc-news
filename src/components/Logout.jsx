import React from 'react';
import { Link } from '@reach/router';
import { Button } from '@material-ui/core';

const Logout = props => {
  const { username, changeLoginState } = props;

  function handleClick() {
    const username = '';
    const userId = '';
    changeLoginState({ username, userId })
  }

  return (
    <div className='Logout'>
      <p>Welcome, {username}</p>
      <Button onClick={handleClick}>Logout</Button>
      <br />
      <Button component={Link} to={`/users/${username}`}>Profile</Button>
    </div>
  );
};

export default Logout;