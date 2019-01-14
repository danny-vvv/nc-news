import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const Nav = props => {
  const { topics } = props;
  return (
    <div styles={styles.root}>
      <AppBar position="static" color='default'>
        <Toolbar>
          <Typography variant="h6" color="inherit" style={styles.grow}>
            NC News
          </Typography>
          <Button component={Link} to='/' color='primary'>
            All
          </Button>
          {topics.map(topic => (
            <Button component={Link} to={`/topics/${topic.slug}`} color='primary' key={topic.slug}>
              {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
            </Button>
          ))}
        </Toolbar>
      </AppBar>
    </div>
  );
};

Nav.propTypes = {
  topics: PropTypes.array.isRequired
};

export default Nav;