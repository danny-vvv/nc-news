import React, { Component } from 'react';
import './Comments.css';
import * as api from '../api';
import { Link } from '@reach/router';
import Form from './Form';
import Delete from './Delete';

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
            updateParent={this.refreshComments}
          />
        }
        {comments.map(comment => (
          <React.Fragment key={comment.comment_id}>
            <p>{comment.votes} votes | <Link to={`/users/${comment.author}`}>{comment.author}</Link> | <i>{comment.created_at}</i></p>
            {comment.author === username &&
              <Delete
                apiMethod={api.deleteComment}
                apiArgs={{ comment_id: comment.comment_id, article_id }}
                targetItem='comment'
                updateParent={this.refreshComments}
              />
            }
            <p>{comment.body}</p>
            <p>---</p>
          </React.Fragment>
        ))}
      </div>
    );
  }

  componentDidMount() {
    this.fetchComments()
  }

  fetchComments() {
    const { article_id } = this.props;
    api.fetchComments(article_id)
      .then(({ comments }) => this.setState({ comments: comments }))
  }

  refreshComments = () => {
    this.fetchComments()
  }
}

export default Comments;