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
        <Nav username={username} changeLoginState={this.changeLoginState} />
        <Router className='main'>
          <Main path='/*' changeLoginState={this.changeLoginState} username={username} userId={userId} />
          <Main path='/topics/:topic' />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

  changeLoginState = (data) => {
    const { username, userId } = data;
    this.setState({
      username,
      userId
    })
  }

  cacheLoginData(data) {
    const { username, userId } = data;
    localStorage.setItem('loginData', JSON.stringify({ username, userId }))
  }

  componentDidMount() {
    this.retrieveLoginData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { username, userId } = this.state;
    if (prevState.username !== username) {
      this.cacheLoginData({ username, userId })
    }
  }

  retrieveLoginData() {
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    if (loginData && loginData.username) {
      const { username, userId } = loginData;
      this.changeLoginState({ username, userId })
    }
  }
}

export default App;
