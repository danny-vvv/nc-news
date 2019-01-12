import React from 'react';
import PropTypes from 'prop-types';
import './Nav.css';
import { Link } from '@reach/router';
import Logout from './Logout';
import Login from './Login';

const Nav = props => {
  const { username, changeLoginState, topics } = props;
  return (
    <nav>
      <Link to='/'>NC NEWS</Link>
      {topics.map(topic => (
        <Link to={`/topics/${topic.slug}`} key={topic.slug}>
          {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
        </Link>
      )
      )}
      {!username && <Login changeLoginState={changeLoginState} />}
      {username && <Logout changeLoginState={changeLoginState} username={username} />}
    </nav>
  );
};

Nav.propTypes = {
  username: PropTypes.string.isRequired,
  changeLoginState: PropTypes.func.isRequired,
  topics: PropTypes.array.isRequired
};

export default Nav;