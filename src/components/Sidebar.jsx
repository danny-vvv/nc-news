import React from 'react';
import './Sidebar.css';
import { Link } from '@reach/router';

const Sidebar = () => {
  return (
    <div className="Sidebar">
      <Link to='/submit'><button>Create Post</button></Link>
    </div>
  );
};

export default Sidebar;