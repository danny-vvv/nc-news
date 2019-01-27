import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, withStyles, Card } from '@material-ui/core';
import GitHubMark32px from '../assets/GitHubMark32px.png';
import LoginDialogue from './LoginDialogue';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
  },
});

class Sidebar extends Component {
  state = {
    promptLogin: false,
  }

  togglePromptLogin = () => {
    const { promptLogin } = this.state;
    this.setState({ promptLogin: !promptLogin });
  }

  render() {
    const { classes, changeLoginState, username } = this.props;
    const { promptLogin } = this.state;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          {!username
          && (
            <React.Fragment>
              <Button color="primary" onClick={() => this.togglePromptLogin()} className={classes.button}>
                Create Post
              </Button>
              <Button color="primary" onClick={() => this.togglePromptLogin()} className={classes.button}>
                New Topic
              </Button>
            </React.Fragment>
          )
        }
          {promptLogin && (
            <LoginDialogue
              changeLoginState={changeLoginState}
              resetLoginPrompt={this.togglePromptLogin}
            />
          )}
          {username
          && (
          <React.Fragment>
            <Button component={Link} to="/submit" color="primary" className={classes.button}>
              Create Post
            </Button>
            <Button component={Link} to="/newtopic" color="primary" className={classes.button}>
              New Topic
            </Button>
          </React.Fragment>
          )
          }
          <Button href="https://github.com/danielvarcas/nc-news" target="_blank" color="secondary">
            <img src={GitHubMark32px} alt="github logo" />
          View on GitHub
          </Button>
        </Card>
      </div>
    );
  }
}

Sidebar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  changeLoginState: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default withStyles(styles)(Sidebar);
