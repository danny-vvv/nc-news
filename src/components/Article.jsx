import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import moment from 'moment';
import * as api from '../api';
import Comments from './Comments';
import Delete from './Delete';
import Vote from './Vote';

class Article extends Component {
  state = {
    author: '',
    body: '',
    comment_count: 0,
    created_at: '',
    title: '',
    topic: '',
    votes: 0,
    userIsAuthor: false,
  }

  componentDidMount() {
    const { article_id } = this.props;
    this.fetchArticle(+article_id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { author, topic } = this.state;
    const { username, article_id, setHeading } = this.props;
    if (username !== prevProps.username || author !== prevState.author) {
      this.setUserIsAuthor();
    }
    if (article_id !== prevProps.article_id) {
      this.fetchArticle(+article_id);
    }
    if (prevState.topic !== topic) {
      setHeading(topic);
    }
  }

  setUserIsAuthor = () => {
    const { author } = this.state;
    const { username } = this.props;
    if (username === author) {
      this.setState({ userIsAuthor: true });
    } else {
      this.setState({ userIsAuthor: false });
    }
  }

  setDeleted = () => {
    this.setState({ deleted: true });
  }

  fetchArticle(topic) {
    api.fetchArticle(topic)
      .then((article) => {
        const {
          author,
          body,
          comment_count,
          created_at,
          title,
          votes,
          topic,
        } = article;
        this.setState({
          author,
          body,
          comment_count,
          created_at,
          title,
          votes,
          topic,
        });
      });
  }

  render() {
    const {
      title, body, author, created_at, votes, userIsAuthor, deleted, topic, comment_count,
    } = this.state;
    const { article_id, username, user_id } = this.props;
    return (
      <div className="Article">
        {!deleted && title
          && (
            <article>
              <Vote
                votes={votes}
                apiMethod={api.voteArticle}
                apiArgs={{ article_id: +article_id }}
                username={username}
              />
              <h2>{title}</h2>
              <Typography variant="caption">
                          Posted by
                <Link to={`/users/${author}`}>
                  {' '}
                  {author}
                </Link>
                {' '}
                {userIsAuthor && <i>(you)</i>}
                {' '}
                {`${moment(created_at).fromNow()}`}
              </Typography>
              <p>{body}</p>
              {userIsAuthor
                && (
                  <Delete
                    apiMethod={api.deleteArticle}
                    apiArgs={{ article_id: +article_id }}
                    targetItem="article"
                    redirectUrl={`/topics/${topic}`}
                    redirectTarget={topic}
                    updateParent={this.setDeleted}
                  />
                )
              }
              <Comments
                article_id={+article_id}
                username={username}
                user_id={user_id}
                comment_count={comment_count}
              />
            </article>
          )}
        {deleted
          && (
            <React.Fragment>
              <p>Your post has been successfully deleted.</p>
              <Link to={`/topics/${topic}`}>
                Return to
                {' '}
                {topic}
              </Link>
            </React.Fragment>
          )
        }
      </div>
    );
  }
}

Article.propTypes = {
  article_id: PropTypes.string,
  username: PropTypes.string,
  user_id: PropTypes.number,
};

Article.defaultProps = {
  article_id: undefined,
  username: undefined,
  user_id: undefined,
};

export default Article;
