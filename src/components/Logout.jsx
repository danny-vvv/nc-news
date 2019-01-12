import React from 'react';
import { Link } from '@reach/router';

const Logout = props => {
  const { username, changeLoginState } = props;

  function handleClick() {
    const username = '';
    const userId = '';
    changeLoginState({ username, userId })
  }

  return (
    <div className='Logout'>
      <span>Hello, <Link to={`/users/${username}`}>{username}</Link>!</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default Logout;