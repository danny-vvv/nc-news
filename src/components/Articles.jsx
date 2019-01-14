import React, { Component } from 'react';
import { Link } from '@reach/router';
import * as api from '../api';
import Vote from './Vote';
import Sort from './Sort';
import { Grid, Typography, withStyles, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  title: {
    fontSize: 14,
    textDecoration: 'none'
  },
});

class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    onLastPage: false,
    sort_by: 'comment_count'
  }

  render() {
    const { articles } = this.state;
    const { username, classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {this.state.page > 1 && <button onClick={() => this.changePage(-1)}>Previous</button>}
              {!this.state.onLastPage && <button onClick={() => this.changePage(1)}>Next</button>}
              <Sort
                updateParentState={this.updateState}
                options={[
                  { name: 'Popular', value: 'comment_count' },
                  { name: 'Top', value: 'votes' },
                  { name: 'New', value: 'created_at' }
                ]}
              />
            </Paper>
          </Grid>
          {articles.map(article =>
            <React.Fragment key={article.article_id}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Vote votes={article.votes} apiMethod={api.voteArticle} apiArgs={{ article_id: article.article_id }} username={username} />
                  <Typography component={Link} to={`/articles/${article.article_id}`} className={classes.title} color="inherit">
                    {article.title}
                  </Typography>
                </Paper>
              </Grid>
            </React.Fragment>
          )}
        </Grid>
      </div>



    );
  }

  componentDidMount() {
    this.fetchArticles()
    this.props.setHeading(this.props.topic)
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, sort_by } = this.state;
    const { topic, setHeading } = this.props;
    if (topic !== prevProps.topic || page !== prevState.page) {
      this.fetchArticles()
      setHeading(topic)
    }
    if (topic !== prevProps.topic) {
      this.setState({ page: 1 })
    }
    if (sort_by !== prevState.sort_by) {
      this.fetchArticles()
    }
  }

  fetchArticles() {
    const { page, sort_by } = this.state;
    const { topic } = this.props;
    const requestBody = { topic, page, sort_by };
    api.fetchArticles(requestBody)
      .then(({ articles }) => {
        this.setState({ articles: articles })
        articles.length < 10
          ? this.setState({ onLastPage: true })
          : this.setState({ onLastPage: false })
      })
      .catch((err) => console.log(err))
  }

  changePage(increment) {
    this.setState({ page: Math.max(this.state.page + increment, 1) })
  }

  updateState = (newState) => {
    const { sort_by } = newState;
    this.setState({
      sort_by
    })
  }

}

export default withStyles(styles)(Articles);