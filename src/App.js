import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Main from './components/Main';

class App extends Component {
  state = {
    username: ''
  }

  render() {
    const { username } = this.state;
    return (
      <div className="App">
        <Nav username={username} />
        <Router className='main'>
          <Main path='/*' changeLoginState={this.changeLoginState} username={username} />
          <Main path='/topics/:topic' />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

  changeLoginState = (username, loggedIn) => {
    this.setState({
      username,
      loggedIn
    })
  }
}

export default App;
