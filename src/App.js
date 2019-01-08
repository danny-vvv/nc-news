import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Articles from './components/Articles';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Article from './components/Article';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Nav />
        <Router>
          <Articles path='/' />
          <Articles path='/topics/:topic' />
          <Article path='/topics/:topic/:article_id' />
        </Router>
        <Sidebar />
        <Footer />
      </div>
    );
  }

}

export default App;
