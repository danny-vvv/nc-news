import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles, Icon, Grid } from '@material-ui/core';
import Login from './Login';
import Logout from './Logout';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  account: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  topics: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

const Nav = (props) => {
  const {
    topics, classes, username, changeLoginState,
  } = props;
  return (
    <div className={classes.root}>
      <Grid container spacing={12}>
        <AppBar position="static" className={classes.appBar} color="default">
          <Toolbar>
            <Grid item xs={8}>
              <div className={classes.topics}>
                <Button variant="contained" component={Link} to="/" color="primary">
                  <Icon>home</Icon>
                  <Typography variant="h6" color="inherit">
                  NC News
                  </Typography>
                </Button>
                {topics.map(topic => (
                  <Button component={Link} to={`/topics/${topic.slug}`} key={topic.slug} color="primary">
                    {topic.slug[0].toUpperCase() + topic.slug.slice(1)}
                  </Button>
                ))}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.account}>
                {!username && <Login changeLoginState={changeLoginState} />}
                {username && <Logout changeLoginState={changeLoginState} username={username} />}
              </div>
            </Grid>
          </Toolbar>
        </AppBar>
      </Grid>
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
  username: PropTypes.string,
  changeLoginState: PropTypes.func.isRequired,
};

Nav.defaultProps = {
  username: '',
};

export default withStyles(styles)(Nav);
