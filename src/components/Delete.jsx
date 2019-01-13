import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Delete extends Component {
    state = {
        clicked: false,
        deleted: false,
        apiRejected: false
    }
    render() {
        const { handleClick, handleApiRequest } = this;
        const { clicked, deleted, apiRejected } = this.state;
        const { targetItem } = this.props;
        return (
            <div>
                {!deleted && <button onClick={() => handleClick('clicked')}>Delete</button>}
                {clicked && !deleted &&
                    <React.Fragment>
                        <p>Permanently delete this {targetItem}?</p>
                        <button onClick={handleApiRequest}>Yes</button>
                        <button onClick={() => handleClick('clicked')}>No</button>
                    </React.Fragment>
                }
                {deleted && <p> Successfully deleted {targetItem} </p>}
                {apiRejected && <p>Unexpected error. Deletion unsuccessful</p>}
            </div>
        );
    }

    handleClick = (key) => {
        const currentState = this.state[key];
        this.setState({ [key]: !currentState })
    }

    handleApiRequest = () => {
        const { apiMethod, apiArgs, updateParent } = this.props;
        this.setState({ deleted: true })

        apiMethod(apiArgs)
            .then(() => {
                if (updateParent) updateParent()
            })
            .catch((err) => {
                console.log(err)
                this.setState({ apiRejected: true })
            })
    }
}

Delete.propTypes = {
    apiMethod: PropTypes.func.isRequired,
    apiArgs: PropTypes.object,
    targetItem: PropTypes.string.isRequired,
    redirectUrl: PropTypes.string,
    updateParent: PropTypes.func
};

export default Delete;