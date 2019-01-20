import React from 'react';
import { Link } from '@reach/router';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';

const Logout = (props) => {
  const { username, changeLoginState } = props;

  return (
    <div className="Logout">
      <p>
        Welcome,
        {' '}
        {username}
      </p>
      <Button color="secondary" variant="contained" onClick={() => changeLoginState({ username: undefined, user_id: undefined })}>Logout</Button>
      <Button color="secondary" variant="contained" component={Link} to={`/users/${username}`}>Profile</Button>
    </div>
  );
};

Logout.propTypes = {
  username: PropTypes.string.isRequired,
  changeLoginState: PropTypes.func.isRequired,
};

export default Logout;
