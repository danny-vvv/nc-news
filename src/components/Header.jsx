import React from 'react';
import { Typography } from '@material-ui/core';

const Header = (props) => {

  const heading = props.heading
    ? props.heading[0].toUpperCase() + props.heading.slice(1)
    : 'Home';

  return (
    <div className='Header' >
      <header>
        <Typography variant='h2' color='inherit'>
          {heading}
        </Typography>
      </header>
    </div>
  );

};

export default Header;