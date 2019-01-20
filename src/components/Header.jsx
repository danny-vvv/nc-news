import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import capitalise from '../utils/capitalise';

const Header = (props) => {
  const { heading } = props;

  return (
    <div className="Header">
      <header>
        <Typography variant="h2" color="inherit">
          {heading && capitalise(heading)}
        </Typography>
      </header>
    </div>
  );
};

Header.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default Header;
