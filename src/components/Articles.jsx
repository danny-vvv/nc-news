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
    sort_by: 'comment_count',
    sort_ascending: false
  }

  render() {
    const { articles } = this.state;
    return (
      <div className='Articles'>
        {this.state.page > 1 && <button onClick={() => this.changePage(-1)}>Previous</button>}
        {!this.state.onLastPage && <button onClick={() => this.changePage(1)}>Next</button>}

        <form onChange={(event) => this.changeSortBy(event)}>
          <label for='sort_by'>SORT </label>
          <select id='sort_by'>
            <option value='comment_count'>Popular</option>
            <option value='created_at'>New</option>
            <option value='votes'>Top</option>
          </select>
        </form>

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
    const { page, sort_by } = this.state;
    const { topic, setHeading } = this.props;
    if (topic !== prevProps.topic || page !== prevState.page) {
      this.fetchArticles()
      setHeading(topic)
    }
    if (topic !== prevProps.topic) {
      this.setState({ page: 1 })
    }
    if (sort_by !== prevState.sort_by) {
      this.fetchArticles()
    }
  }

  fetchArticles() {
    const { page, sort_by } = this.state;
    const { topic } = this.props;
    const requestBody = { topic, page, sort_by };
    api.fetchArticles(requestBody)
      .then(({ articles }) => {
        this.setState({ articles: articles })
        articles.length < 10
          ? this.setState({ onLastPage: true })
          : this.setState({ onLastPage: false })
      })
      .catch((err) => console.log(err))
  }

  changePage(increment) {
    this.setState({ page: Math.max(this.state.page + increment, 1) })
  }

  changeSortBy = (event) => {
    const sort_by = event.target.value;
    this.setState({
      sort_by
    })
  }
}

export default Articles;