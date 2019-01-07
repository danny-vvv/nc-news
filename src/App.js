import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Header from './components/Header';
import Articles from './components/Articles';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

class App extends Component {
  state = {
    articles: [],
    comments: []
  }
  render() {
    return (
      <div className="App">
        <Nav />
        <Header />
        <Articles />
        <Sidebar />
        <Footer />
      </div>
    );
  }
}

export default App;
