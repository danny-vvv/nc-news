import React, { Component } from 'react';
import { Router } from '@reach/router';
import { Grid, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import Nav from './components/Nav';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import Articles from './components/Articles';
import Article from './components/Article';
import User from './components/User';
import * as api from './api';
import Form from './components/Form';
import withRoot from './withRoot';
import Sort from './components/Sort';

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
    sort_by: 'comment_count',
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

  changeSortBy = (sort_by) => {
    this.setState({
      sort_by,
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
      username, user_id, heading, topics, sort_by,
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
              {/* <Header path="/" /> */}
              <Header path="/*" heading={heading} />
            </Router>
          </Grid>
          )
          }
          <Grid item xs={10}>
            <Sort
              sort_by={sort_by}
              updateParentState={this.changeSortBy}
              options={[
                { name: 'Popular', value: 'comment_count' },
                { name: 'Top', value: 'votes' },
                { name: 'New', value: 'created_at' },
              ]}
            />
          </Grid>
          <Grid item xs={10}>
            <Router>
              <Login path="/login" changeLoginState={changeLoginState} />
              <Articles path="/" setHeading={setHeading} username={username} sort_by={sort_by} />
              <Articles path="/topics/:topic" setHeading={setHeading} username={username} sort_by={sort_by} />
              <Article path="/articles/:article_id" username={username} user_id={user_id} setHeading={setHeading} />
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
          <Grid item xs={2}>
            <Sidebar username={username} changeLoginState={changeLoginState} topics={topics} />
          </Grid>
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
