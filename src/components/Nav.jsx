import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import Logout from './Logout';
import Login from './Login';

class Nav extends Component {
  render() {
    const { username, changeLoginState } = this.props;
    return (
      <nav>
        <Link to='/'>NC NEWS</Link>
        <Link to='/topics/cooking'>Cooking</Link>
        <Link to='/topics/coding'>Coding</Link>
        <Link to='/topics/football'>Football</Link>
        {!username && <Login changeLoginState={changeLoginState} />}
        {username && <Logout changeLoginState={changeLoginState} username={username} />}
      </nav>
    );
  }
}

export default Nav;