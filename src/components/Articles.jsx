import React, { Component } from 'react';
import './Articles.css';
import { Link } from '@reach/router';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: [],
    page: 1
  }

  render() {
    const { articles } = this.state;
    console.log(this.state)
    return (
      <React.Fragment>
        <div>
          <button onClick={() => this.changePage(-1)}>Previous</button>
          <button onClick={() => this.changePage(1)}>Next</button>
          {articles.map(article =>
            <p key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                {article.title}
              </Link>
            </p>
          )}
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.fetchArticles()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic || this.state.page !== prevState.page) {
      this.fetchArticles()
    }
  }

  fetchArticles() {
    api.fetchArticles(this.props.topic, this.state.page)
      .then(({ articles }) => this.setState({ articles: articles }))
  }

  changePage(increment) {
    this.setState({ page: Math.max(this.state.page + increment, 1) })
  }
}

export default Articles;