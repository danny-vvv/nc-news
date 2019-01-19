import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const Nav = (props) => {
  const { topics, classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" color="inherit" classes={classes.grow}>
            NC News
          </Typography>
          <Button component={Link} to="/" color="inherit">
            All
          </Button>
          {topics.map(topic => (
            <Button component={Link} to={`/topics/${topic.slug}`} color="inherit" key={topic.slug}>
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Nav.propTypes = {
  topics: PropTypes.arrayOf(PropTypes.shape(
    {
      slug: PropTypes.string,
      description: PropTypes.string,
    },
  )).isRequired,
  classes: PropTypes.shape(
    {
      root: PropTypes.string,
      grow: PropTypes.string,
    },
  ).isRequired,
};

export default withStyles(styles)(Nav);
