import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Typography, Card, withStyles, Avatar,
} from '@material-ui/core';
import * as api from '../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class User extends Component {
  state = {
    user: {},
  }

  componentDidMount() {
    const { username, setHeading } = this.props;
    this.fetchUser(username);
    setHeading(`User: ${username}`);
  }

  fetchUser(username) {
    api.fetchUser(username)
      .then(({ user }) => this.setState({ user }));
  }

  render() {
    const { user } = this.state;
    const { classes } = this.props;
    const { username, avatar_url, name } = user;
    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <Typography variant="h2">{username}</Typography>
          <Avatar alt={username} src={avatar_url} className={classes.avatar} />
          <Typography variant="subtitle1">{name}</Typography>
        </Card>
      </div>
    );
  }
}

User.propTypes = {
  username: PropTypes.string,
  setHeading: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
};

User.defaultProps = {
  username: '',
};

export default withStyles(styles)(User);
