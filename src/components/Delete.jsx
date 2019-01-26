import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

class Delete extends Component {
    state = {
      clicked: false,
      deleted: false,
      apiRejected: false,
    }

    handleClick = (key) => {
      const { state } = this;
      const currentState = state[key];
      this.setState({ [key]: !currentState });
    }

    handleApiRequest = () => {
      const { apiMethod, apiArgs, updateParent } = this.props;
      this.setState({ deleted: true });

      apiMethod(apiArgs)
        .then(() => {
          if (updateParent) updateParent();
        })
        .catch(this.setState({ apiRejected: true }));
    }

    render() {
      const { handleClick, handleApiRequest } = this;
      const { clicked, deleted, apiRejected } = this.state;
      const { targetItem } = this.props;
      return (
        <div>
          {!deleted && <Button color="inherit" variant="contained" onClick={() => handleClick('clicked')}>Delete</Button>}
          {clicked && !deleted
                      && (
                      <React.Fragment>
                        <p>
  Permanently delete this
                          {' '}
                          {targetItem}
  ?
                        </p>
                        <Button color="secondary" variant="contained" onClick={handleApiRequest}>Yes</Button>
                        {' '}
                        <Button color="secondary" variant="contained" onClick={() => handleClick('clicked')}>No</Button>
                      </React.Fragment>
                      )
                  }
          {deleted && (
          <p>
            {' '}
  Successfully deleted
            {' '}
            {targetItem}
            {' '}
          </p>
          )}
          {apiRejected && <p>Unexpected error. Deletion unsuccessful</p>}
        </div>
      );
    }
}

Delete.propTypes = {
  apiMethod: PropTypes.func.isRequired,
  apiArgs: PropTypes.shape({
    comment_id: PropTypes.number,
    article_id: PropTypes.number,
  }).isRequired,
  targetItem: PropTypes.string.isRequired,
  updateParent: PropTypes.func,
};

Delete.defaultProps = {
  updateParent: undefined,
};

export default Delete;
