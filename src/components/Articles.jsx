import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  Grid, Typography, withStyles, Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Vote from './Vote';
import Sort from './Sort';
import * as api from '../api';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
    textDecoration: 'none',
  },
});

class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    onLastPage: false,
    sort_by: 'comment_count',
  }

  componentDidMount() {
    const { setHeading, topic } = this.props;
    this.fetchArticles();
    setHeading(topic);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, sort_by } = this.state;
    const { topic, setHeading } = this.props;
    if (topic !== prevProps.topic || page !== prevState.page) {
      this.fetchArticles();
      setHeading(topic);
    }
    if (topic !== prevProps.topic) {
      this.resetPage();
    }
    if (sort_by !== prevState.sort_by) {
      this.fetchArticles();
    }
  }

  updateState = (newState) => {
    const { sort_by } = newState;
    this.setState({
      sort_by,
    });
  }

  resetPage() {
    this.setState({ page: 1 });
  }

  fetchArticles() {
    const { page, sort_by } = this.state;
    const { topic } = this.props;
    const requestBody = { topic, page, sort_by };
    api.fetchArticles(requestBody)
      .then(({ articles }) => {
        this.setState({ articles });
        if (articles.length < 10) {
          this.setState({ onLastPage: true });
        } else {
          this.setState({ onLastPage: false });
        }
      })
      .catch(err => console.log(err));
  }

  changePage(increment) {
    const { page } = this.state;
    this.setState({ page: Math.max(page + increment, 1) });
  }

  render() {
    const { articles, page, onLastPage } = this.state;
    const { username, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {page > 1 && <button type="button" onClick={() => this.changePage(-1)}>Previous</button>}
              {!onLastPage && <button type="button" onClick={() => this.changePage(1)}>Next</button>}
              <Sort
                updateParentState={this.updateState}
                options={[
                  { name: 'Popular', value: 'comment_count' },
                  { name: 'Top', value: 'votes' },
                  { name: 'New', value: 'created_at' },
                ]}
              />
            </Paper>
          </Grid>
          {articles.map(article => (
            <React.Fragment key={article.article_id}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Vote votes={article.votes} apiMethod={api.voteArticle} apiArgs={{ article_id: article.article_id }} username={username} />
                  <Typography
                    component={Link}
                    to={`/articles/${article.article_id}`}
                    color="primary"
                    variant="h4"
                    className={classes.title}
                  >
                    {article.title}
                  </Typography>
                </Paper>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </div>
    );
  }
}

Articles.propTypes = {
  topic: PropTypes.string,
  setHeading: PropTypes.func,
  username: PropTypes.string,
  classes: PropTypes.shape({
    root: PropTypes.string,
    paper: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

Articles.defaultProps = {
  topic: 'NC News',
  setHeading: undefined,
  username: undefined,
};

export default withStyles(styles)(Articles);
