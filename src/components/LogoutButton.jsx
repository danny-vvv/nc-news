import React from 'react';

const LogoutButton = props => {

  function handleClick() {
    const username = '';
    const userId = '';
    props.changeLoginState({ username, userId })
  }

  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
};

export default LogoutButton;