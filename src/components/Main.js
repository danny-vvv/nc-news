import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './Header';
import Articles from './Articles';
import Article from './Article';

class Main extends Component {
  state = {
    currentTopic: this.props.topic
  }
  render() {
    return (
      <section>
        <Header heading={this.state.currentTopic} />
        <Router>
          <Articles path='/' />
          <Articles path='/topics/:topic' />
          <Article path='/articles/:article_id' />
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