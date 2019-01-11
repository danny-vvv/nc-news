import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import LogoutButton from './LogoutButton';

class Nav extends Component {
  render() {
    const { username } = this.props;
    return (
      <nav>
        <Link to='/'>NC NEWS</Link>
        <Link to='/topics/cooking'>Cooking</Link>
        <Link to='/topics/coding'>Coding</Link>
        <Link to='/topics/football'>Football</Link>
        {!username && <Link to='/login'>Login</Link>}
        {username && <p>Hello, <Link to={`/users/${username}`}>{this.props.username}</Link>!</p>}
        {username && <LogoutButton changeLoginState={this.props.changeLoginState} />}
      </nav>
    );
  }
}

export default Nav;