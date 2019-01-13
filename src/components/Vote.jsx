import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Vote extends Component {
    state = {
        voteChange: 0,
        lastIncrement: 0,
        apiRejected: false,
        promptLogin: false
    }
    render() {
        const { handleClick, disable } = this;
        const { voteChange, apiRejected, promptLogin } = this.state;
        const { votes } = this.props;
        return (
            <div>
                <button onClick={() => handleClick(-1)} disabled={disable(-1)}>Downvote</button>
                <span>{votes + voteChange}</span>
                <button onClick={() => handleClick(1)} disabled={disable(1)}>Upvote</button>
                {apiRejected && <p>Oops! Vote could not be counted. Try again later.</p>}
                {promptLogin && <span>Please login to vote.</span>}
            </div>
        );
    }

    disable = (num) => {
        const { voteChange } = this.state;
        return num === voteChange ? true : false;
    }

    handleClick = (increment) => {
        const { username } = this.props;
        if (username) this.incrementVote(increment)
        else this.setState({
            promptLogin: true
        })
    }

    incrementVote(increment) {
        const { voteChange } = this.state;
        this.setState({
            voteChange: voteChange + increment,
            lastIncrement: increment
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const voteChange = this.state;
        const { username } = this.props;
        if (username !== prevProps.username) {
            this.setState({ promptLogin: false })
        }
        if (voteChange !== prevState.voteChange) {
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
    apiArgs: PropTypes.object.isRequired,
    username: PropTypes.string.isRequired
};

export default Vote;