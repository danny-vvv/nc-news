import React, { Component } from 'react';
import './Comments.css';
import * as api from '../api';

class Comments extends Component {
  state = {
    comments: []
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        <h3>Comments:</h3>
        {comments.map(comment => (
          <React.Fragment key={comment.comment_id}>
            <p>{comment.votes} votes | {comment.author} | {comment.created_at}</p>
            <p>{comment.body}</p>
            <p>---</p>
          </React.Fragment>
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.fetchComments(this.props.articleId)
  }

  fetchComments(articleId) {
    api.fetchComments(articleId)
      .then(({ comments }) => this.setState({ comments: comments }))
  }
}

export default Comments;