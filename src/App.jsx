import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Grid, withStyles, Hidden } from '@material-ui/core';
import PropTypes from 'prop-types';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import Articles from './components/Articles';
import Article from './components/Article';
import User from './components/User';
import * as api from './api';
import Form from './components/Form';
import withRoot from './withRoot';
import LoginButton from './components/LoginButton';

const styles = () => ({
  root: {
    backgroundColor: '#e6e6e6',
  },
});

class App extends Component {
  state = {
    username: '',
    user_id: 0,
    heading: '',
    topics: [],
  }

  componentDidMount() {
    this.fetchTopics();
    this.retrieveLoginData();
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      username, user_id, topics,
    } = this.state;
    if (prevState.username !== username) {
      localStorage.setItem('loginData', JSON.stringify({ username, user_id }));
    }
    if (JSON.stringify(topics) !== JSON.stringify(prevState.topics)) {
      this.fetchTopics();
    }
  }

  changeLoginState = (data) => {
    const { username, user_id } = data;
    this.setState({
      username,
      user_id,
    });
  }

  setHeading = (heading) => {
    this.setState({ heading });
  }

  retrieveLoginData() {
    const loginData = JSON.parse(localStorage.getItem('loginData'));
    if (loginData && loginData.username) {
      const { username, user_id } = loginData;
      this.changeLoginState({ username, user_id });
    }
  }

  fetchTopics() {
    api.fetchTopics()
      .then((topics) => {
        this.setState({ topics });
      });
  }

  render() {
    const { classes } = this.props;
    const { changeLoginState, setHeading } = this;
    const {
      username, user_id, heading, topics,
    } = this.state;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            <Nav topics={topics} username={username} changeLoginState={changeLoginState} />
          </Grid>
          {heading
          && (
          <Grid item xs={12}>
            <Router>
              <Header path="/*" heading={heading} />
            </Router>
          </Grid>
          )
          }
          <Grid item md>
            <Router>
              <LoginButton path="/login" changeLoginState={changeLoginState} />
              <Articles path="/" setHeading={setHeading} username={username} changeLoginState={changeLoginState} />
              <Articles path="/topics/:topic" setHeading={setHeading} username={username} changeLoginState={changeLoginState} />
              <Article path="/articles/:article_id" username={username} user_id={user_id} setHeading={setHeading} changeLoginState={changeLoginState} />
              <User path="/users/:username" setHeading={setHeading} />
              <Form // Post Article
                path="/submit"
                heading="Submit an Article"
                setHeading={setHeading}
                requireLoggedIn
                username={username}
                changeLoginState={changeLoginState}
                inputs={[
                  { id: 'topic', type: 'select', options: topics.map(topic => topic.slug) },
                  { id: 'title', type: 'text' },
                  { id: 'body', type: 'text' },
                ]}
                apiMethod={api.postArticle}
                apiArgs={{ user_id }}
                successUrl="/articles"
                successEndpoint="article_id"
                rejectMessage="Oops! An error occurred..."
              />
              <Form // Add Topic
                path="/newtopic"
                heading="Create a New Topic"
                setHeading={setHeading}
                requireLoggedIn
                username={username}
                changeLoginState={changeLoginState}
                inputs={[
                  { id: 'slug', type: 'text' },
                  { id: 'description', type: 'text' },
                ]}
                apiMethod={api.postTopic}
                successUrl="/topics"
                successEndpoint="slug"
                rejectMessage="Topic already exists!"
              />
            </Router>
          </Grid>
          <Hidden xsDown>
            <Grid item xs={4}>
              <Sidebar username={username} changeLoginState={changeLoginState} topics={topics} />
            </Grid>
          </Hidden>
          <Grid item xs={12}>
            <Footer />
          </Grid>
        </Grid>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default withRoot(withStyles(styles)(App));
