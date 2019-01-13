import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component {
    state = {
        voteChange: 0,
        lastIncrement: 0,
        apiRejected: false
    }
    render() {
        const { handleClick } = this;
        const { voteChange, apiRejected } = this.state;
        const { votes } = this.props;
        return (
            <div>
                <button onClick={() => handleClick(-1)}>Downvote</button>
                <span>{votes + voteChange}</span>
                <button onClick={() => handleClick(1)}>Upvote</button>
                {apiRejected && <p>Oops! Vote could not be counted. Try again later.</p>}
            </div>
        );
    }

    handleClick = (increment) => {
        this.incrementVote(increment)
    }

    incrementVote(increment) {
        const { voteChange } = this.state;
        this.setState({
            voteChange: voteChange + increment,
            lastIncrement: increment
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.voteChange !== prevState.voteChange) {
            this.handleApiRequest()
        }
    }

    handleApiRequest() {
        const { lastIncrement } = this.state;
        const { apiMethod, apiArgs } = this.props;
        const requestBody = {
            inc_votes: lastIncrement,
            ...apiArgs
        }
        apiMethod(requestBody).catch(() => this.setState({ apiRejected: true }))
    }
}

Vote.propTypes = {
    votes: PropTypes.number.isRequired,
    apiMethod: PropTypes.func.isRequired,
    apiArgs: PropTypes.object.isRequired
};

export default Vote;