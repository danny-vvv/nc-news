import React, { Component } from 'react';
import * as api from '../api';

class PostArticle extends Component {
  state = {
    topics: []
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        <form>
          <select name='topic' className='form-topics'>
            {topics && topics.map(topic => (
              <option key={topic.slug}>{topic.slug}</option>
            ))}
          </select>
          <br />
          <input type='text' placeholder='Title' id='title' className='form-title'></input>
          <br />
          <input type='text' placeholder='Body' id='body' className='form-body'></input>
          <br />
          <button type='submit' className='btn-submit'>Submit</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics() {
    api.fetchTopics().then(({ topics }) => this.setState({ topics: topics }))
  }
}

export default PostArticle;