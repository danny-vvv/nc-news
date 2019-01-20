import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, Icon } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    color: theme.palette.primary.contrastText,
  },
});

const Nav = (props) => {
  const { topics, classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit">
            NC News
          </Typography>
          <Button component={Link} to="/" color="secondary">
            <Icon>home</Icon>
          </Button>
          {topics.map(topic => (
            <Button component={Link} to={`/topics/${topic.slug}`} color="secondary" key={topic.slug}>
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
  classes: PropTypes.shape({
    root: PropTypes.string,
    grow: PropTypes.string,
  }).isRequired,
};

export default withStyles(styles)(Nav);
