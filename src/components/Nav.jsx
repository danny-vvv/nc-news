import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';
import LogoutButton from './LogoutButton';
import Login from './Login';

class Nav extends Component {
  state = {
    loggingIn: false
  }
  render() {
    const { username } = this.props;
    const { loggingIn } = this.state;
    return (
      <nav>
        <Link to='/'>NC NEWS</Link>
        <Link to='/topics/cooking'>Cooking</Link>
        <Link to='/topics/coding'>Coding</Link>
        <Link to='/topics/football'>Football</Link>
        {!username && !loggingIn && <Login changeLoginState={this.props.changeLoginState} />}
        {loggingIn && <Login changeLoginState={this.props.changeLoginState} onClick={this.handleClick} />}
        {username && <p>Hello, <Link to={`/users/${username}`}>{this.props.username}</Link>!</p>}
        {username && <LogoutButton changeLoginState={this.props.changeLoginState} />}
      </nav>
    );
  }

  handleClick() {
    this.setState({ loggingIn: true })
  }
}

export default Nav;