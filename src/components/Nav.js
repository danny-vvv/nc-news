import React, { Component } from 'react';
import './Nav.css';
import { Link } from '@reach/router';

class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to='/'>NC NEWS</Link>
        <Link to='/topics/cooking'>Cooking</Link>
        <Link to='/topics/coding'>Coding</Link>
        <Link to='topics/football'>Football</Link>
      </nav >
    );
  }

  handleClick() {

  }
}

export default Nav;