import React, { Component } from 'react';
import * as api from '../api';
import { Link } from '@reach/router';
import Form from './Form';
import Delete from './Delete';
import Vote from './Vote';
import Sort from './Sort';

class Comments extends Component {
  state = {
    comments: [],
    sort_by: 'votes'
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
        <Sort
          updateParentState={this.updateState}
          options={[
            { name: 'Top', value: 'votes' },
            { name: 'New', value: 'created_at' }
          ]}
        />
        {comments.map(comment => (
          <React.Fragment key={comment.comment_id}>
            <Vote votes={comment.votes} apiMethod={api.voteComment} apiArgs={{ article_id, comment_id: comment.comment_id }} username={username} />
            <p><Link to={`/users/${comment.author}`}>{comment.author}</Link> | <i>{comment.created_at}</i></p>
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

  componentDidUpdate(prevProps, prevState) {
    const { sort_by } = this.state;
    if (sort_by !== prevState.sort_by) {
      this.fetchComments()
    }
  }

  fetchComments() {
    const { sort_by } = this.state;
    const { article_id } = this.props;
    const requestBody = { article_id, sort_by };
    api.fetchComments(requestBody)
      .then(({ comments }) => this.setState({ comments: comments }))
  }

  refreshComments = () => {
    this.fetchComments()
  }

  updateState = (newState) => {
    const { sort_by } = newState;
    this.setState({
      sort_by
    })
  }

}

export default Comments;