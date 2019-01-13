import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import { Router } from '@reach/router';
import Header from './components/Header';
import Login from './components/Login';
import Articles from './components/Articles';
import Article from './components/Article';
import User from './components/User';
import * as api from './api';
import Form from './components/Form';

class App extends Component {
  state = {
    username: '',
    userId: '',
    heading: '',
    topics: []
  }

  render() {
    const { changeLoginState, setHeading } = this;
    const { username, userId, heading, topics } = this.state;
    return (
      <div className="App">
        <Nav username={username} changeLoginState={changeLoginState} topics={topics} />
        <Header heading={heading} />
        <Router>
          <Login path='/login' changeLoginState={changeLoginState} />
          <Articles path='/' setHeading={setHeading} />
          <Articles path='/topics/:topic' setHeading={setHeading} />
          <Article path='/articles/:article_id' username={username} user_id={userId} setHeading={setHeading} />
          <User path='/users/:username' setHeading={setHeading} />
          <Form // Post Article
            path='/submit'
            heading='Submit an Article'
            setHeading={setHeading}
            requireLoggedIn={true}
            username={username}
            changeLoginState={changeLoginState}
            inputs={[
              { id: 'topic', type: 'select', options: topics.map(topic => topic.slug) },
              { id: 'title', type: 'text' },
              { id: 'body', type: 'text' }
            ]}
            apiMethod={api.postArticle}
            apiArgs={{ user_id: userId }}
            successUrl={'/articles'}
            successEndpoint={'article_id'}
            rejectMessage='Oops! An error occurred...'
          />
          <Form // Add Topic
            path='/newtopic'
            heading='Create a New Topic'
            setHeading={setHeading}
            requireLoggedIn={true}
            username={username}
            changeLoginState={changeLoginState}
            inputs={[
              { id: 'slug', type: 'text' },
              { id: 'description', type: 'text' }
            ]}
            apiMethod={api.postTopic}
            successUrl={'/topics'}
            successEndpoint={'slug'}
            rejectMessage='Topic already exists!'
          />
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
    this.fetchTopics()
    this.retrieveLoginData()
  }

  componentDidUpdate(prevProps, prevState) {
    const { username, userId, topics } = this.state;
    if (prevState.username !== username) {
      this.cacheLoginData({ username, userId })
    }
    if (JSON.stringify(topics) !== JSON.stringify(prevState.topics)) {
      this.fetchTopics()
    }
  }

  retrieveLoginData() {
    const loginData = JSON.parse(localStorage.getItem('loginData'))
    if (loginData && loginData.username) {
      const { username, userId } = loginData;
      this.changeLoginState({ username, userId })
    }
  }

  setHeading = (heading) => {
    this.setState({ heading })
  }

  fetchTopics() {
    api.fetchTopics()
      .then(({ topics }) => {
        this.setState({ topics })
      })
  }
}

export default App;
