import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import Vote from './Vote';
import Sort from './Sort';

class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    onLastPage: false,
    sort_by: 'comment_count'
  }

  render() {
    const { articles } = this.state;
    const { username } = this.props;
    return (
      <div className='Articles'>
        {this.state.page > 1 && <button onClick={() => this.changePage(-1)}>Previous</button>}
        {!this.state.onLastPage && <button onClick={() => this.changePage(1)}>Next</button>}
        <Sort
          updateParentState={this.updateState}
          options={[
            { name: 'Popular', value: 'comment_count' },
            { name: 'Top', value: 'votes' },
            { name: 'New', value: 'created_at' }
          ]}
        />
        <ul>
          {articles.map(article =>
            <li key={article.article_id}>
              <React.Fragment >
                <Vote votes={article.votes} apiMethod={api.voteArticle} apiArgs={{ article_id: article.article_id }} username={username} />
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

  updateState = (newState) => {
    const { sort_by } = newState;
    this.setState({
      sort_by
    })
  }

}

export default Articles;