import axios from 'axios';

const BASE_URL = 'https://dv-knews.herokuapp.com/api';

export const fetchArticle = async (articleId) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
  return data;
};

export const fetchArticles = async (requestBody) => {
  const { topic, page, sort_by } = requestBody;
  const sortByQuery = `&sort_by=${sort_by}`;
  const { data } = topic
    ? await axios.get(`${BASE_URL}/topics/${topic}/articles?p=${page}${sortByQuery}`)
    : await axios.get(`${BASE_URL}/articles?p=${page}${sortByQuery}`);
  return data;
};

export const fetchComments = async (requestBody) => {
  const { article_id, sort_by } = requestBody;
  const sortByQuery = `?sort_by=${sort_by}`;
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}/comments${sortByQuery}`);
  return data;
};

export const fetchUser = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
};

export const fetchUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
};

export const fetchTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data;
};

export const postArticle = async (requestBody) => {
  const {
    topic, title, body, user_id,
  } = requestBody;
  const { data } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    user_id,
  });
  return data.article;
};

export const deleteArticle = async (requestBody) => {
  const { article_id } = requestBody;
  const { data } = await axios.delete(`${BASE_URL}/articles/${article_id}`);
  return data;
};

export const voteArticle = async (requestBody) => {
  const { inc_votes, article_id } = requestBody;
  const { data } = await axios.patch(`${BASE_URL}/articles/${article_id}`, {
    inc_votes,
  });
  return data;
};

export const postComment = async (requestBody) => {
  const { user_id, body, article_id } = requestBody;
  const { data } = await axios.post(`${BASE_URL}/articles/${article_id}/comments`, {
    user_id,
    body,
  });
  return data.comment;
};

export const deleteComment = async (requestBody) => {
  const { comment_id, article_id } = requestBody;
  const { data } = await axios.delete(`${BASE_URL}/articles/${article_id}/comments/${comment_id}`);
  return data;
};

export const voteComment = async (requestBody) => {
  const { inc_votes, article_id, comment_id } = requestBody;
  const { data } = await axios.patch(`${BASE_URL}/articles/${article_id}/comments/${comment_id}`, {
    inc_votes,
  });
  return data;
};

export const postTopic = async (body) => {
  const { description } = body;
  const slug = body.slug.toLowerCase();
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug,
    description,
  });
  return data.topic;
};
