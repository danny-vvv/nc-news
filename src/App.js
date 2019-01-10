import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Main from './components/Main';

class App extends Component {
  state = {
    username: '',
    userId: ''
  }

  render() {
    const { username, userId } = this.state;
    return (
      <div className="App">
        <Nav username={username} />
        <Router className='main'>
          <Main path='/*' changeLoginState={this.changeLoginState} username={username} userId={userId} />
          <Main path='/topics/:topic' />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

  changeLoginState = (username, userId) => {
    this.setState({
      username,
      userId
    })
  }
}

export default App;
