import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import {
  Typography, withStyles, Grid, Button,
} from '@material-ui/core';
import moment from 'moment';
import Delete from './Delete';
import Vote from './Vote';
import Sort from './Sort';
import CommentForm from './CommentForm';
import * as api from '../api';

const styles = theme => ({
  comments: {
    display: 'flex',
    flexDirection: 'column',
  },
  comment: {
    display: 'flex',
    flexDirection: 'column',
  },
  commentBody: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Comments extends Component {
  state = {
    comments: [],
    sort_by: 'created_at',
    page: 1,
    onLastPage: false,
  }

  componentDidMount() {
    this.fetchComments();
  }

  componentDidUpdate(prevProps, prevState) {
    const { sort_by, page } = this.state;
    if (sort_by !== prevState.sort_by || page !== prevState.page) {
      this.fetchComments();
    }
  }

  updateState = (newState) => {
    this.setState({
      sort_by: newState,
    });
  }

  refreshComments = () => {
    this.fetchComments();
  }

  fetchComments() {
    const { sort_by, page } = this.state;
    const { article_id } = this.props;
    api.fetchComments({ article_id, sort_by, page })
      .then(({ comments }) => this.setState({ comments }));
  }

  changePage(increment) {
    const { page } = this.state;
    this.setState({ page: Math.max(page + increment, 1) });
  }

  render() {
    const {
      comments, sort_by, page, onLastPage,
    } = this.state;
    const {
      classes, username, user_id, article_id, changeLoginState,
    } = this.props;
    return (
      <div>
        {!comments.length && <p><i>Be the first to comment!</i></p>}
        {!username && <p>(You must be logged in to post comments.)</p>}
        {username
          && (
            <CommentForm username={username} user_id={user_id} article_id={article_id} updateParent={this.refreshComments} />
          )}
        <Sort
          sort_by={sort_by}
          updateParentState={this.updateState}
          options={[
            { name: 'New', value: 'created_at' },
            { name: 'Top', value: 'votes' },
          ]}
        />
        {
          <Button variant="text" color="primary" onClick={() => this.changePage(-1)} disabled={page === 1}>
                  Previous
          </Button>
          }
        {
          <Button variant="text" color="primary" onClick={() => this.changePage(1)} disabled={onLastPage}>
                  Next
          </Button>
          }
        {comments.map(comment => (
          <React.Fragment key={comment.comment_id}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={1}>
                  <Vote
                    votes={comment.votes}
                    apiMethod={api.voteComment}
                    apiArgs={{ article_id, comment_id: comment.comment_id }}
                    username={username}
                    changeLoginState={changeLoginState}
                  />
                </Grid>
                <Grid item xs={11}>
                  <Typography variant="caption">
                    <Link to={`/users/${comment.author}`}>
                      {comment.author}
                    </Link>
                    {comment.author === username && (
                    <i>
                      {
                    ' (you) '
                    }
                    </i>
                    )}
                    {`· ${moment(comment.created_at).fromNow()}`}
                  </Typography>
                  <Typography variant="body1" className={classes.commentBody}>
                    {comment.body}
                  </Typography>
                  {comment.author === username && (
                    <Delete
                      apiMethod={api.deleteComment}
                      apiArgs={{ comment_id: comment.comment_id, article_id }}
                      targetItem="comment"
                      updateParent={this.refreshComments}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </React.Fragment>
        ))}

      </div>
    );
  }
}

Comments.propTypes = {
  article_id: PropTypes.number.isRequired,
  username: PropTypes.string,
  user_id: PropTypes.number,
  changeLoginState: PropTypes.func.isRequired,
};

Comments.defaultProps = {
  username: undefined,
  user_id: undefined,
};

export default withStyles(styles)(Comments);
