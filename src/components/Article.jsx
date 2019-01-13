import React, { Component } from 'react';
import * as api from '../api';
import './Article.css';
import Comments from './Comments';
import { Link } from '@reach/router';
import Delete from './Delete';

class Article extends Component {
  state = {
    article_id: 0,
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
    const { article_id, username, user_id } = this.props;
    return (
      <div className='Article'>
        {!deleted && title &&
          <article>
            <h2>{title}</h2>
            <p>by <Link to={`/users/${author}`}>{author}</Link> {userIsAuthor && <i>(you)</i>} | <i>{created_at}</i></p>
            <p>{body}</p>
            {userIsAuthor &&
              <Delete
                apiMethod={api.deleteArticle}
                apiArgs={{ article_id }}
                targetItem='article'
                redirectUrl={`/topics/${topic}`}
                redirectTarget={topic}
                updateParent={this.setDeleted}
              />
            }
            <Comments article_id={article_id} username={username} user_id={user_id} />
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

    if (prevProps.article_id !== this.props.article_id) {
      this.fetchArticle(this.props.article_id)
    }

    if (prevState.topic !== this.state.topic) {
      this.props.setHeading(this.state.topic)
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
  }

  setDeleted = () => {
    this.setState({ deleted: true })
  }

}

export default Article;