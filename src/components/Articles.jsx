import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  Grid, Typography, withStyles, Card, CardActionArea, CardContent, Icon, Button, CircularProgress, Fade,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import Vote from './Vote';
import * as api from '../api';
import Sort from './Sort';

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
  vote: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },
  titleSection: {
    display: 'flex',
    flexDirection: 'column',
  },
  titleText: {
    fontSize: '16pt',
    textDecoration: 'none',
  },
  content: {
    flex: '1 0 auto',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  articleLink: {
    all: 'none',
  },
  articlesNavigation: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing.unit,
  },
  circularProgress: {
    align: 'center',
  },
});


class Articles extends Component {
  state = {
    articles: [],
    page: 1,
    onLastPage: false,
    sort_by: 'comment_count',
    fetched: false,
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

  changeSortBy = (sort_by) => {
    this.setState({
      sort_by,
    });
  }

  changePage(increment) {
    const { page } = this.state;
    this.setState({ page: Math.max(page + increment, 1) });
  }

  fetchArticles() {
    const { page, sort_by } = this.state;
    const { topic } = this.props;
    api.fetchArticles({ topic, page, sort_by })
      .then(({ articles }) => {
        this.setState({ articles, fetched: true });
        if (articles.length < 10) {
          this.setState({ onLastPage: true });
        } else {
          this.setState({ onLastPage: false });
        }
      })
      .catch((err) => {
        if (err) console.log(err);
      });
  }

  resetPage() {
    this.setState({ page: 1 });
  }

  render() {
    const {
      articles, page, onLastPage, sort_by, fetched,
    } = this.state;
    const { username, classes, changeLoginState } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <div className={classes.articlesNavigation}>
                <Sort
                  sort_by={sort_by}
                  updateParentState={this.changeSortBy}
                  options={[
                    { name: 'Popular', value: 'comment_count' },
                    { name: 'Top', value: 'votes' },
                    { name: 'New', value: 'created_at' },
                  ]}
                />
                {
                  <Button variant="text" color="primary" onClick={() => this.changePage(-1)} disabled={page === 1}>
                  Previous
                  </Button>
          }
                {
                  <Button variant="text" color="primary" onClick={() => this.changePage(1)} disabled={onLastPage}>
                  Next
                  </Button>
          }
              </div>
            </Card>
          </Grid>
          {!fetched && <CircularProgress className={classes.circularProgress} /> }
          {articles.map(article => (
            <React.Fragment key={article.article_id}>
              <Fade in>
                <Grid item xs={12}>
                  <Card className={classes.card}>
                    <Grid container>
                      <Grid item xs={1}>
                        <div className={classes.vote}>
                          <Vote
                            votes={article.votes}
                            apiMethod={api.voteArticle}
                            apiArgs={{ article_id: article.article_id }}
                            username={username}
                            changeLoginState={changeLoginState}
                          />
                        </div>
                      </Grid>
                      <Grid item xs={11}>
                        <div className={classes.details}>
                          <Typography variant="caption">
                                Posted by
                            <Link to={`/users/${article.author}`}>
                              {' '}
                              {article.author}
                            </Link>
                            {' '}
                            {`${moment(article.created_at).fromNow()}`}
                          </Typography>
                        </div>
                        <CardActionArea component={Link} to={`/articles/${article.article_id}`}>
                          <div className={classes.titleSection}>
                            <CardContent>
                              <Typography
                                color="inherit"
                                variant="h1"
                                className={classes.titleText}
                              >
                                {article.title}
                              </Typography>
                            </CardContent>
                          </div>
                        </CardActionArea>
                        <div className={classes.details}>
                          <Typography variant="caption">
                            <Icon fontSize="small" color="primary">comment</Icon>
                            {' '}
                            {`${article.comment_count} comments`}
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Fade>
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
  changeLoginState: PropTypes.func.isRequired,
};

Articles.defaultProps = {
  topic: undefined,
  setHeading: undefined,
  username: undefined,
};

export default withStyles(styles)(Articles);
