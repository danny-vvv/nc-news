import React, { Component } from 'react';
import * as api from '../api'

class AddCommentForm extends Component {
  state = {
    body: '',
    validComment: false,
    invalidComment: false,
    success: false
  }
  render() {
    const { invalidComment, success } = this.state;
    return (
      <div>
        {!success &&
          <React.Fragment>
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <p>Post a comment:</p>
              <input type='text' id='body' onChange={this.handleChange}></input>
              <br />
              <button type='submit'>Submit</button>
            </form>
            {invalidComment && <p>Comment cannot be blank.</p>}
          </React.Fragment>
        }
        {success && <p>Comment posted!</p>}
      </div>
    );
  }

  handleChange = (event) => {
    this.setState(({ [event.target.id]: event.target.value.trim() }))
  }

  handleSubmit(e) {
    e.preventDefault();
    const { body } = this.state;
    if (body) {
      this.postComment()
      this.setState({ validComment: true, invalidComment: false })
    } else {
      this.setState({ validComment: false, invalidComment: true })
    }
  }

  postComment() {
    const { body } = this.state;
    const { userId, articleId } = this.props;
    api.postComment(userId, body, articleId)
      .then(this.setState({ success: true }))
      .catch((err) => {
        this.setState({ success: false })
        console.log(err)
      })
  }
}

export default AddCommentForm;