import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, withStyles, Card } from '@material-ui/core';
import GitHubMark32px from '../assets/GitHubMark32px.png';

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

const Sidebar = (props) => {
  const { classes, username } = props;
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Button component={Link} to="/submit" color="primary" className={classes.button}> Create Post</Button>
        <Button component={Link} to="/newtopic" color="primary" className={classes.button}>New Topic</Button>
        <Button href="https://github.com/danielvarcas/nc-news" color="secondary">
          <img src={GitHubMark32px} alt="github logo" />
          View on GitHub
        </Button>
      </Card>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Sidebar);
