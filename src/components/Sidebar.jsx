import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { Button, withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const Sidebar = (props) => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Paper>
        <Button component={Link} to="/submit" color="secondary" className={classes.button}> Create Post</Button>
        <Button component={Link} to="/newtopic" color="secondary" className={classes.button}>New Topic</Button>
      </Paper>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.shape({}).isRequired,
};

export default withStyles(styles)(Sidebar);
