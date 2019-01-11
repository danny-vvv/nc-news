import axios from 'axios';

const BASE_URL = 'https://dv-knews.herokuapp.com/api';

export const fetchArticle = async (articleId) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
  return data;
}

export const fetchArticles = async (topic, page) => {
  const { data } = topic
    ? await axios.get(`${BASE_URL}/topics/${topic}/articles?p=${page}`)
    : await axios.get(`${BASE_URL}/articles?p=${page}`);
  return data;
}

export const fetchComments = async (articleId) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}/comments`)
  return data;
}

export const fetchUser = async (username) => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);
  return data;
}

export const fetchUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data;
}

export const fetchTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);
  return data;
}

export const postArticle = async (topic, title, body, user_id) => {
  const { data } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    user_id
  })
  return data;
}

export const deleteArticle = async (articleId) => {
  const { data } = await axios.delete(`${BASE_URL}/articles/${articleId}`);
  return data;
}

export const postComment = async (user_id, body, articleId) => {
  const { data } = await axios.post(`${BASE_URL}/articles/${articleId}/comments`, {
    user_id,
    body
  });
  return data;
}