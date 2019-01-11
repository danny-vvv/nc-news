import React, { Component } from 'react';

class DeleteArticleButton extends Component {
  state = { clicked: false }
  render() {
    const { clicked } = this.state;
    return (
      <div>
        <button onClick={this.handleClick}>Delete Article</button>
        {clicked &&
          <React.Fragment>
            <p>Permanently delete this article?</p>
            <button onClick={this.props.deleteArticle}>Yes</button>
            <button onClick={this.handleClick}>No</button>
          </React.Fragment>
        }
      </div>
    );
  }

  handleClick = () => {
    const toggleClicked = this.state.clicked ? false : true;
    this.setState({ clicked: toggleClicked })
  }
}

export default DeleteArticleButton;