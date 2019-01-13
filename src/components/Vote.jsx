import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component {
    state = {
        voteChange: 0,
        lastIncrement: 0
    }
    render() {
        const { handleClick } = this;
        const { voteChange } = this.state;
        const { votes } = this.props;
        return (
            <div>
                <button onClick={() => handleClick(1)}>Upvote</button>
                <span>{votes + voteChange}</span>
                <button onClick={() => handleClick(-1)}>Downvote</button>
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
        apiMethod(requestBody)
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }
}

Vote.propTypes = {
    votes: PropTypes.number.isRequired,
    apiMethod: PropTypes.func.isRequired,
    apiArgs: PropTypes.object.isRequired
};

export default Vote;