import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router>
          <Articles path='/' />
          <Articles path='/topics/:topic' />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

}

export default App;
