import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Main from './components/Main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router>
          <Main path='/*' />
          <Main path='/topics/:topic' />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

}

export default App;
