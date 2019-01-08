import React, { Component } from 'react';
import * as api from '../api';
import './Article.css';

class Article extends Component {
  state = {
    article: {}
  }
  render() {
    const { title, body, author } = this.state.article;
    return (
      <div className='main'>
        <p>{title}</p>
        <p>by {author}</p>
        <p>{body}</p>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle(this.props.article_id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchArticle(this.props.article_id)
    }
  }

  fetchArticle(topic) {
    api.fetchArticle(topic)
      .then(({ article }) => this.setState({ article: article }))
  }
}

export default Article;