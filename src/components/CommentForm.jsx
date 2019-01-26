import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button, TextField, withStyles, Typography,
} from '@material-ui/core';
import { postComment } from '../api';

const styles = theme => ({
  root: {

  },
  textField: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class CommentForm extends Component {
  state = {
    body: '',
    formRejected: false,
    apiRejected: false,
  }

  handleChange = (event) => {
    this.setState(({ body: event.target.value, formRejected: false }));
  }

  capitalise = word => word[0].toUpperCase() + word.slice(1)

  handleSubmit(e) {
    const { body } = this.state;
    const trimmedBody = body.trim();
    e.preventDefault();
    if (trimmedBody) {
      this.setState({ formRejected: false });
      this.handleApiRequest(trimmedBody);
    } else {
      this.setState({ formRejected: true });
    }
  }

  handleApiRequest(body) {
    const { user_id, article_id, updateParent } = this.props;
    postComment({ body, user_id, article_id })
      .then(() => {
        updateParent();
        this.setState({ body: '' });
      })
      .catch((err) => {
        if (err) this.setState({ apiRejected: true });
      });
  }

  render() {
    const { body, formRejected, apiRejected } = this.state;
    const { classes, username } = this.props;
    return (
      <div>
        <Typography variant="caption">
          {`Comment as ${username}`}
        </Typography>
        <form onSubmit={e => this.handleSubmit(e)}>
          <TextField
            id="body"
            value={body}
            variant="outlined"
            error={formRejected}
            label="What are your thoughts?"
            multiline
            rowsMax="10"
            onChange={this.handleChange}
            className={classes.textField}
            margin="normal"
          />
          <Button type="submit" className="btn-submit" color="primary" variant="contained">Comment</Button>
        </form>
        {apiRejected
          && (
          <Typography variant="body2">
            Oops! An unexpected error occurred. Please try again later.
          </Typography>
          )
          }
      </div>
    );
  }
}

CommentForm.propTypes = {
  user_id: PropTypes.number.isRequired,
  article_id: PropTypes.number.isRequired,
  updateParent: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(CommentForm);
