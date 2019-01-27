import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Icon, Button, withStyles, Typography,
} from '@material-ui/core';
import LoginDialogue from './LoginDialogue';

const styles = theme => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    fill: 'inherit',
    flexDirection: 'column',
  },
});

class Vote extends Component {
    state = {
      voteChange: 0,
      lastIncrement: 0,
      apiRejected: false,
      promptLogin: false,
    }

    componentDidUpdate(prevProps, prevState) {
      const { voteChange } = this.state;
      const { username } = this.props;
      if (username !== prevProps.username) {
        this.resetLoginPrompt();
      }
      if (voteChange !== prevState.voteChange) {
        this.handleApiRequest();
      }
    }

    disable = (num) => {
      const { voteChange } = this.state;
      return num === voteChange;
    }

    handleClick = (increment) => {
      const { username } = this.props;
      if (username) this.incrementVote(increment);
      else {
        this.setState({
          promptLogin: true,
        });
      }
    }

    resetLoginPrompt = () => {
      this.setState({ promptLogin: false });
    }

    incrementVote(increment) {
      const { voteChange } = this.state;
      this.setState({
        voteChange: voteChange + increment,
        lastIncrement: increment,
      });
    }

    handleApiRequest() {
      const { lastIncrement } = this.state;
      const { apiMethod, apiArgs } = this.props;
      const requestBody = {
        inc_votes: lastIncrement,
        ...apiArgs,
      };
      apiMethod(requestBody).catch(() => this.setState({ apiRejected: true }));
    }

    render() {
      const { handleClick, disable, resetLoginPrompt } = this;
      const { voteChange, apiRejected, promptLogin } = this.state;
      const {
        votes, classes, hideVotes, changeLoginState,
      } = this.props;
      return (
        <div className={classes.root}>
          <Button variant="text" size="small" onClick={() => handleClick(1)} disabled={disable(1)}><Icon>arrow_drop_up</Icon></Button>
          <Typography variant="overline">
            {!hideVotes && votes + voteChange}
          </Typography>
          <Button variant="text" size="small" onClick={() => handleClick(-1)} disabled={disable(-1)}><Icon>arrow_drop_down</Icon></Button>
          {apiRejected && <p>Oops! Vote could not be counted. Try again later.</p>}
          {promptLogin && (
          <LoginDialogue
            changeLoginState={changeLoginState}
            resetLoginPrompt={resetLoginPrompt}
          />
          )}
        </div>
      );
    }
}

Vote.propTypes = {
  votes: PropTypes.number.isRequired,
  apiMethod: PropTypes.func.isRequired,
  apiArgs: PropTypes.shape({
    comment_id: PropTypes.number,
    article_id: PropTypes.number,
  }).isRequired,
  username: PropTypes.string,
  classes: PropTypes.shape({}).isRequired,
  hideVotes: PropTypes.bool,
  changeLoginState: PropTypes.func.isRequired,
};

Vote.defaultProps = {
  hideVotes: false,
  username: undefined,
};

export default withStyles(styles)(Vote);
