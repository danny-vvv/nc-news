import React, { Component } from 'react';
import './Articles.css';
import { Link } from '@reach/router';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: []
  }

  render() {
    const { articles } = this.state;
    return (
      < div className="main" >
        <p><u>Articles</u></p>
        {articles.map(article => <p key={article.article_id}>{article.title}</p>)}
      </div >
    );
  }

  componentDidMount() {
    this.fetchArticles(this.props.topic)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles(this.props.topic)
    }
  }

  fetchArticles(topic) {
    api.fetchArticles(topic)
      .then(({ articles }) => this.setState({ articles: articles }))
  }
}

export default Articles;