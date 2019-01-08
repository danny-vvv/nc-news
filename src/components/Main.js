import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './Header';
import Articles from './Articles';
import Article from './Article';

class Main extends Component {
  render() {
    return (
      <div className='main'>
        {console.log('TOPIC on Main >>>', this.props.topic)}
        <Header heading={this.props.topic} />
        <Router>
          <Articles path='/' />
          <Articles path='/topics/:topic' />
          <Article path='/topics/:topic/:article_id' />
        </Router>
      </div>
    );
  }
}

export default Main;