import React, { Component } from 'react';
import SubmitForm from './SubmitForm';
import Login from './Login';

class Submit extends Component {
  state = {
    success: null,
    fail: null
  }

  render() {
    const { username, userId } = this.props;
    const { success, fail } = this.state;
    return (
      <div>
        {!success && username && <SubmitForm userId={userId} setSubmitState={this.setSubmitState} setArticleId={this.setArticleId} />}
        {!username && <Login changeLoginState={this.props.changeLoginState} />}
        {success && <p>Post successful!</p>}
        {fail && <p>Please ensure all fields are completed.</p>}
      </div>
    );
  }

  setSubmitState = (success, fail) => {
    this.setState({ success, fail })
  }
}

export default Submit;