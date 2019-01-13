import React, { Component } from 'react';
import './Articles.css';
import { Link } from '@reach/router';
import * as api from '../api';
import Vote from './Vote';

class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    onLastPage: false,
  }

  render() {
    const { articles } = this.state;
    return (
      <div className='Articles'>
        {this.state.page > 1 && <button onClick={() => this.changePage(-1)}>Previous</button>}
        {!this.state.onLastPage && <button onClick={() => this.changePage(1)}>Next</button>}
        <ul>
          {articles.map(article =>
            <li key={article.article_id}>
              <React.Fragment >
                <Vote votes={article.votes} apiMethod={api.voteArticle} apiArgs={{ article_id: article.article_id }} />
                <Link to={`/articles/${article.article_id}`}>
                  {article.title}
                </Link>
              </React.Fragment>
            </li>
          )}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticles()
    this.props.setHeading(this.props.topic)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic || this.state.page !== prevState.page) {
      this.fetchArticles()
      this.props.setHeading(this.props.topic)
    }
    if (prevProps.topic !== this.props.topic) {
      this.setState({ page: 1 })
    }
  }

  fetchArticles() {
    api.fetchArticles(this.props.topic, this.state.page)
      .then(({ articles }) => {
        this.setState({ articles: articles })

        articles.length < 10
          ? this.setState({ onLastPage: true })
          : this.setState({ onLastPage: false })
      })
  }

  changePage(increment) {
    this.setState({ page: Math.max(this.state.page + increment, 1) })
  }
}

export default Articles;