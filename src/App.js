import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Articles from './components/Articles';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';

class App extends Component {
  state = {
    currentTopic: ''
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Header />

        <Router>
          <Articles path='/' />
          <Articles path='/topics/:topic' />
        </Router>

        <Sidebar />
        <Footer />
      </div>
    );
  }
  handleClick(topic) {
    this.setState({ currentTopic: topic })
  }

}

export default App;
