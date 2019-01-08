import React, { Component } from 'react';
import * as api from '../api';
import './Article.css';

class Article extends Component {
  state = {
    article: {
      title: "JavaScript’s Apply, Call, and Bind Methods are Essential for JavaScript Professionals",
      body: "Functions are objects in JavaScript, as you should know by now, if you have read any of the prerequisite articles. And as objects, functions have methods, including the powerful Apply, Call, and Bind methods. On the one hand, Apply and Call are nearly identical and are frequently used in JavaScript for borrowing methods and for setting the this value explicitly. We also use Apply for variable-arity functions; you will learn more about this in a bit.",
      author: "grumpy19",
      article_id: 6,
      votes: 0,
      created_at: "2018-03-14T10:27:39.137+00:00",
      topic: "coding",
      comment_count: "11"
    }
  }
  render() {
    const { title, body, author, votes, created_at, comment_count } = this.state.article;
    return (
      <div className='main'>
        <p>{title}</p>
        <p>by {author}</p>
        <p>{body}</p>
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle(this.props.article_id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchArticle(this.props.article_id)
    }
  }

  fetchArticle(topic) {
    api.fetchArticle(topic)
      .then(({ article }) => this.setState({ article: article }))
  }
}

export default Article;