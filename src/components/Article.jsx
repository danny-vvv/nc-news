import React, { Component } from 'react';
import * as api from '../api';
import './Article.css';
import Comments from './Comments';
import { Link } from '@reach/router';
import DeleteArticleButton from './DeleteArticleButton';

class Article extends Component {
  state = {
    article_id: 0,
    author: '',
    body: '',
    comment_count: 0,
    created_at: '',
    title: 'this is a test',
    topic: 'coding',
    user_id: 6,
    votes: 0,
    userIsAuthor: false
  }
  render() {
    const { title, body, author, created_at, userIsAuthor } = this.state;
    return (
      <div className='article'>
        <h2>{title}</h2>
        <p>by <Link to={`/users/${author}`}>{author}</Link> {userIsAuthor && <i>(you)</i>} | <i>{created_at}</i></p>
        <p>{body}</p>
        {userIsAuthor && <DeleteArticleButton deleteArticle={this.deleteArticle} />}
        <Comments articleId={this.props.article_id} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle(this.props.article_id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.setUserIsAuthor();
    }
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchArticle(this.props.article_id)
    }
  }

  fetchArticle(topic) {
    api.fetchArticle(topic)
      .then((article) => {
        const {
          article_id,
          author,
          body,
          comment_count,
          created_at,
          title,
          topic,
          user_id,
          votes
        } = article;
        this.setState({
          article_id,
          author,
          body,
          comment_count,
          created_at,
          title,
          topic,
          user_id,
          votes
        })
      })
      .then((this.setUserIsAuthor()))
  }

  setUserIsAuthor = () => {
    const { author } = this.state;
    const { username } = this.props;
    if (username === author) {
      this.setState({ userIsAuthor: true })
    } else {
      this.setState({ userIsAuthor: false })
    }
  }

  deleteArticle() {
    // api.deleteArticle(article)
  }
}

export default Article;