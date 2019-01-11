import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './Header';
import Login from './Login';
import Articles from './Articles';
import Article from './Article';
import User from './User';
import Submit from './Submit';

class Main extends Component {
  state = {
    currentTopic: this.props.topic
  }
  render() {
    const { username, userId } = this.props;
    return (
      <section>
        <Header heading={this.state.currentTopic} />
        <Router>
          <Login path='/login' changeLoginState={this.props.changeLoginState} />
          <Articles path='/' />
          <Articles path='/topics/:topic' />
          <Article path='/articles/:article_id' username={username} />
          <User path='/users/:username' />
          <Submit path='/submit' username={username} userId={userId} changeLoginState={this.props.changeLoginState} />
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