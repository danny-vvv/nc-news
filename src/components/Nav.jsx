import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import Logout from './Logout';
import Login from './Login';

class Nav extends Component {
  render() {
    const { username, changeLoginState, topics } = this.props;
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
  }
}

export default Nav;