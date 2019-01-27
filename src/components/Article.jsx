import React, { Component } from 'react';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';
import {
  Grid, Typography, Card, CardContent, Icon, withStyles, Fade,
} from '@material-ui/core';
import moment from 'moment';
import * as api from '../api';
import Comments from './Comments';
import Delete from './Delete';
import Vote from './Vote';

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
    flexDirection: 'row',
  },
  articleLink: {
    all: 'none',
  },
  articlesNavigation: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: theme.spacing.unit,
  },
  delete: {
    display: 'flex',
    paddingTop: theme.spacing.unit * 2,
  },
  comments: {
    display: 'flex',
  },
});

class Article extends Component {
  state = {
    author: '',
    body: '',
    comment_count: 0,
    created_at: '',
    title: '',
    topic: '',
    votes: 0,
    userIsAuthor: false,
  }

  componentDidMount() {
    const { article_id } = this.props;
    this.fetchArticle(+article_id);
  }

  componentDidUpdate(prevProps, prevState) {
    const { author, topic } = this.state;
    const { username, article_id, setHeading } = this.props;
    if (username !== prevProps.username || author !== prevState.author) {
      this.setUserIsAuthor();
    }
    if (article_id !== prevProps.article_id) {
      this.fetchArticle(+article_id);
    }
    if (prevState.topic !== topic) {
      setHeading(topic);
    }
  }

  setUserIsAuthor = () => {
    const { author } = this.state;
    const { username } = this.props;
    if (username === author) {
      this.setState({ userIsAuthor: true });
    } else {
      this.setState({ userIsAuthor: false });
    }
  }

  setDeleted = () => {
    this.setState({ deleted: true });
  }

  fetchArticle(topic) {
    api.fetchArticle(topic)
      .then((article) => {
        const {
          author,
          body,
          comment_count,
          created_at,
          title,
          votes,
          topic,
        } = article;
        this.setState({
          author,
          body,
          comment_count,
          created_at,
          title,
          votes,
          topic,
        });
      });
  }

  render() {
    const {
      title, body, author, created_at, votes, userIsAuthor, deleted, topic, comment_count,
    } = this.state;
    const {
      classes, article_id, username, user_id, changeLoginState,
    } = this.props;
    return (
      <Fade in timeout={1000}>
        <div className={classes.root}>
          {!deleted && title
          && (
          <Card>
            <Grid container>
              <Grid item xs={1}>
                <div className={classes.vote}>
                  <Vote
                    votes={votes}
                    apiMethod={api.voteArticle}
                    apiArgs={{ article_id: +article_id }}
                    username={username}
                    changeLoginState={changeLoginState}
                  />
                </div>
              </Grid>
              <Grid item xs={11}>
                <div className={classes.details}>
                  <Typography variant="caption">
                    <Link to={`/users/${author}`}>
                      {author}
                    </Link>
                    {userIsAuthor && <i> (you) </i>}
                    {`${moment(created_at).fromNow()}`}
                  </Typography>
                </div>
                <div className={classes.titleSection}>
                  <CardContent className={classes.cardContent}>
                    <Typography
                      color="inherit"
                      variant="h1"
                      className={classes.titleText}
                    >
                      {title}
                    </Typography>
                    <article>
                      <Typography variant="body1">
                        {body}
                      </Typography>
                    </article>
                    <div className={classes.details}>
                      <Typography variant="caption">
                        <Icon fontSize="small" color="primary">comment</Icon>
                        {` ${comment_count} comments`}
                      </Typography>
                      {userIsAuthor
                      && (
                      <Delete
                        apiMethod={api.deleteArticle}
                        apiArgs={{ article_id: +article_id }}
                        targetItem="article"
                        redirectUrl={`/topics/${topic}`}
                        redirectTarget={topic}
                        updateParent={this.setDeleted}
                      />
                      )
                    }
                    </div>
                  </CardContent>
                </div>

              </Grid>
              <div className={classes.comments}>
                <Comments
                  article_id={+article_id}
                  username={username}
                  user_id={user_id}
                  comment_count={comment_count}
                  changeLoginState={changeLoginState}
                />
              </div>
            </Grid>
          </Card>
          )}
          {deleted
            && (
              <React.Fragment>
                <p>Your post has been successfully deleted.</p>
                <Link to={`/topics/${topic}`}>
                  Return to
                  {' '}
                  {topic}
                </Link>
              </React.Fragment>
            )
          }
        </div>
      </Fade>
    );
  }
}

Article.propTypes = {
  article_id: PropTypes.string,
  username: PropTypes.string,
  user_id: PropTypes.number,
  classes: PropTypes.shape({}).isRequired,
  changeLoginState: PropTypes.func.isRequired,
  setHeading: PropTypes.func.isRequired,
};

Article.defaultProps = {
  article_id: undefined,
  username: undefined,
  user_id: undefined,
};

export default withStyles(styles)(Article);
