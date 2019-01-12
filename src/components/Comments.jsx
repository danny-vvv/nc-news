import React, { Component } from 'react';
import './Comments.css';
import * as api from '../api';
import { Link } from '@reach/router';
import Form from './Form';

class Comments extends Component {
  state = {
    comments: []
  }

  render() {
    const { comments } = this.state;
    const { username, user_id, article_id } = this.props;
    return (
      <div>
        <h3>Comments:</h3>
        {!comments.length && <p><i>Be the first to comment!</i></p>}
        {!username && <p>(You must be logged in to post comments.)</p>}
        {username &&
          <Form // Add Comment
            inputs={[{ id: 'body', type: 'text' }]}
            apiMethod={api.postComment}
            apiArgs={{ user_id, article_id }}
            rejectMessage={'Unexpected error. Comment could not be posted.'}
          />
        }
        {comments.map(comment => (
          <React.Fragment key={comment.comment_id}>
            <p>{comment.votes} votes | <Link to={`/users/${comment.author}`}>{comment.author}</Link> | <i>{comment.created_at}</i></p>
            <p>{comment.body}</p>
            <p>---</p>
          </React.Fragment>
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.fetchComments(this.props.article_id)
  }

  fetchComments(article_id) {
    api.fetchComments(article_id)
      .then(({ comments }) => this.setState({ comments: comments }))
  }
}

export default Comments;