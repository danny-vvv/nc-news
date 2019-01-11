import React, { Component } from 'react';
import * as api from '../api';
import { navigate } from '@reach/router';

class SubmitForm extends Component {
  state = {
    topics: [],
    topic: '',
    title: '',
    body: '',
  }
  render() {
    const { topics } = this.state;
    return (
      <div>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <select name='topic' className='form-topics' id='topic' onChange={this.handleChange}>
            <option value=''>Choose a topic...</option>
            {topics && topics.map(topic => (
              <option key={topic.slug} value={topic.slug}>{topic.slug}</option>
            ))}
          </select>
          <br />
          <input type='text' placeholder='Title' className='form-title' id='title' onChange={this.handleChange}></input>
          <br />
          <input type='text' placeholder='Body' className='form-body' id='body' onChange={this.handleChange}></input>
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

  handleChange = (event) => {
    this.setState(({ [event.target.id]: event.target.value.trim() }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const { setSubmitState } = this.props;
    const { topic, title, body } = this.state;
    if (topic && title && body) {
      this.postArticle();
      setSubmitState(true, false)
    } else {
      setSubmitState(false, true)
    }
  }

  postArticle() {
    const { topic, title, body } = this.state;
    api.postArticle(topic, title, body, this.props.userId)
      .then(({ article }) => {
        console.log('data >>>>', article)
        const { article_id } = article;
        console.log(`/articles/${article_id}`)
        navigate(`/articles/${article_id}`)
      })
      .catch((err) => console.log(err))
  }
}

export default SubmitForm;