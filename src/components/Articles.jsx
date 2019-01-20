import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  Grid, Typography, withStyles, Card, ButtonBase, CardActionArea, CardContent, CardMedia,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router/lib/history';
import moment from 'moment';
import Vote from './Vote';
import Sort from './Sort';
import * as api from '../api';

const styles = (theme) => {
  console.log(theme);
  return {
    root: {
      flexGrow: 1,
      padding: theme.spacing.unit,
    },
    card: {
      diplay: 'flex',
    },
    details: {
      display: 'flex',
    },
    content: {
      flex: '1 0 auto',
    },
    controls: {
      display: 'flex',
    },
    title: {
      fontSize: '14pt',
      textDecoration: 'none',
    },
  };
};


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
    if (topic) setHeading(topic);
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
            <Card className={classes.card}>
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
            </Card>
          </Grid>
          {articles.map(article => (
            <React.Fragment key={article.article_id}>
              <Grid item xs={12}>

                <Card className={classes.card}>
                  <Grid container spacing={12}>
                    <CardActionArea>
                      <Grid item xs={12}>
                        <div className={classes.details}>
                          <CardContent>
                            <Typography
                              component={Link}
                              to={`/articles/${article.article_id}`}
                              color="inherit"
                              variant="h1"
                              className={classes.title}
                            >
                              {article.title}
                            </Typography>
                          </CardContent>
                        </div>
                      </Grid>
                    </CardActionArea>
                    <Grid item xs={12}>
                      <div className={classes.controls}>
                        <Vote votes={article.votes} apiMethod={api.voteArticle} apiArgs={{ article_id: article.article_id }} username={username} />
                        <Typography variant="overline">
                          Posted by
                          <Link to={`/users/${article.author}`}>
                            {' '}
                            {article.author}
                          </Link>
                          {' '}
                          {`${moment(article.created_at).fromNow()}`}
                        </Typography>
                      </div>
                    </Grid>
                  </Grid>
                </Card>


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
    card: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
};

Articles.defaultProps = {
  topic: undefined,
  setHeading: undefined,
  username: undefined,
};

export default withStyles(styles)(Articles);
