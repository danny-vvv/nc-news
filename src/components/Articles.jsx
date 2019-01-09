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
      <React.Fragment>
        <div>
          {articles.map(article => <p key={article.article_id}><Link to={`/articles/${article.article_id}`}>{article.title}</Link></p>)}
        </div>
      </React.Fragment>
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