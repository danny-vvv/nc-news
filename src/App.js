import React, { Component } from 'react';
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
import { Grid, Paper, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    backgroundColor: '#e6e6e6'
  },
});


class App extends Component {
  state = {
    username: '',
    userId: '',
    heading: '',
    topics: []
  }

  render() {
    const { classes } = this.props;
    const { changeLoginState, setHeading } = this;
    const { username, userId, heading, topics } = this.state;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Nav topics={topics} />
          </Grid>
          <Grid item xs={12}>
            <Header heading={heading} />
          </Grid>
          <Grid item xs={8}>
            <Router>
              <Login path='/login' changeLoginState={changeLoginState} />
              <Articles path='/' setHeading={setHeading} username={username} />
              <Articles path='/topics/:topic' setHeading={setHeading} username={username} />
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
          </Grid>
          <Grid item xs={4}>
            <Paper>
              <Sidebar username={username} changeLoginState={changeLoginState} topics={topics} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
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

export default withStyles(styles)(App);