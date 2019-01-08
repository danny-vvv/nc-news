import React, { Component } from 'react';
import './Articles.css';
import * as api from '../api';

class Articles extends Component {
  state = {
    articles: []
  }

  render() {
    const { articles } = this.state;
    return (
      <React.Fragment>
        <div>
          <header className="head">
            {console.log(this.props)}
            <h1>{
              this.props.topic
                ? this.props.topic[0].toUpperCase() + this.props.topic.slice(1)
                : 'Home'
            }</h1>
          </header>
        </div>
        <div className="main" >
          <p><u>Articles</u></p>
          {articles.map(article => <p key={article.article_id}>{article.title}</p>)}
        </div>
      </React.Fragment>
    );
  }

  componentDidMount() {
    this.fetchArticles(this.props.topic)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.fetchArticles(this.props.topic)
    }
  }

  fetchArticles(topic) {
    api.fetchArticles(topic)
      .then(({ articles }) => this.setState({ articles: articles }))
  }
}

export default Articles;