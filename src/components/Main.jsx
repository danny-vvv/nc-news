import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './Header';
import Login from './Login';
import Articles from './Articles';
import Article from './Article';
import User from './User';
import PostArticle from './PostArticle';

class Main extends Component {
  state = {
    currentTopic: this.props.topic
  }
  render() {
    return (
      <section>
        <Header heading={this.state.currentTopic} />
        <Router>
          <Login path='/login' changeLoginState={this.props.changeLoginState} />
          <Articles path='/' />
          <Articles path='/topics/:topic' />
          <Article path='/articles/:article_id' />
          <User path='/users/:username' />
          <PostArticle path='/submit' />
        </Router>
      </section>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentTopicInState(prevProps, prevState)
  }

  setCurrentTopicInState(prevProps, prevState) {
    if (prevState.currentTopic !== this.props.topic) {
      if (this.props.topic) { this.setState({ currentTopic: this.props.topic }) }
      else {
        if (this.props['*'] === '' && this.state.currentTopic !== 'Home') {
          this.setState({ currentTopic: 'Home' })
        }
      }
    }
  }
}

export default Main;