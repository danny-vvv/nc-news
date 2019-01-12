import React, { Component } from 'react';
import * as api from '../api';
import './Article.css';
import Comments from './Comments';
import { Link } from '@reach/router';
import DeleteArticleButton from './DeleteArticleButton';

class Article extends Component {
  state = {
    articleId: 0,
    author: '',
    body: '',
    comment_count: 0,
    created_at: '',
    title: '',
    topic: '',
    user_id: 6,
    votes: 0,
    userIsAuthor: false,
    deleted: false
  }
  render() {
    const { title, body, author, created_at, userIsAuthor, deleted, topic } = this.state;
    return (
      <div className='Article'>
        {!deleted && title &&
          <article>
            <h2>{title}</h2>
            <p>by <Link to={`/users/${author}`}>{author}</Link> {userIsAuthor && <i>(you)</i>} | <i>{created_at}</i></p>
            <p>{body}</p>
            {userIsAuthor && <DeleteArticleButton deleteArticle={this.deleteArticle} />}
            <Comments articleId={this.props.article_id} username={this.props.username} userId={this.props.userId} />
          </article>
        }
        {deleted &&
          <React.Fragment>
            <p>Your post has been successfully deleted.</p>
            <Link to={`/topics/${topic}`}>Return to {topic}</Link>
          </React.Fragment>
        }
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle(this.props.article_id)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.username !== prevProps.username
      || this.state.author !== prevState.author
    ) {
      this.setUserIsAuthor();
    }

    if (prevProps.articleId !== this.props.articleId) {
      this.fetchArticle(this.props.articleId)
    }
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
          articleId: article_id,
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
  }

  deleteArticle = () => {
    api.deleteArticle(this.state.articleId)
    this.setState({ deleted: true })
  }
}

export default Article;