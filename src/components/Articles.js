import React, { Component } from 'react';
import './Articles.css';
import { Link } from '@reach/router';

class Articles extends Component {
  state = {
    articles: []
  }

  render() {
    const { articles } = this.state;
    return (
      < div className="main" >
        <p><u>Articles</u></p>
        {articles.map(article => <p key={article.article_id}>{article.title}</p>)}
      </div >
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
    if (topic === 'cooking') {
      this.setState({
        articles: [{
          title: "Seafood substitutions are increasing",
          article_id: 33
        },
        {
          title: "Twice-Baked Butternut Squash Is the Thanksgiving Side Dish of Your Dreams",
          article_id: 30
        },
        {
          title: "Sweet potato & butternut squash soup with lemon & garlic toast",
          article_id: 25
        }]
      })
    } else if (topic === 'coding') {
      this.setState({
        articles: [{
          title: 'CODING!!',
          article_id: 2
        }]
      })
    } else if (topic === 'football') {
      this.setState({
        articles: [{
          title: 'FOOTBALL!',
          article_id: 3
        }]
      })
    }
  }
}

export default Articles;