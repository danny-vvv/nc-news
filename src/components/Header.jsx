import React from 'react';
import { Typography, withStyles, Card } from '@material-ui/core';
import PropTypes from 'prop-types';
import capitalise from '../utils/capitalise';
import withRoot from '../withRoot';

const styles = theme => ({
  root: {
    padding: '10px',
    backgroundColor: theme.palette.primary.light,
  },
  heading: {
    color: 'white',
  },
});

const Header = (props) => {
  const { heading, classes } = props;
  return (
    <div className={classes.root}>
      {heading
      && (
      <header>
        <Typography variant="h6" className={classes.heading}>
          {heading && capitalise(heading)}
        </Typography>
      </header>
      )
    }
    </div>
  );
};

Header.propTypes = {
  heading: PropTypes.string,
  classes: PropTypes.shape({ root: PropTypes.string }).isRequired,
};

Header.defaultProps = {
  heading: undefined,
};

export default withRoot(withStyles(styles)(Header));
