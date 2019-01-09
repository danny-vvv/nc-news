import React from 'react';

const Header = (props) => {

  const heading = props.heading
    ? props.heading[0].toUpperCase() + props.heading.slice(1)
    : 'Home';

  return (
    <div className="head">
      <header>
        <h1>{heading}</h1>
      </header>
    </div>
  );

};

export default Header;