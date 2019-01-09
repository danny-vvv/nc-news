import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api';

export const fetchArticles = async (topic) => {
  const { data } = topic
    ? await axios.get(`${BASE_URL}/topics/${topic}/articles`)
    : await axios.get(`${BASE_URL}/articles`);
  return data;
}

export const fetchArticle = async (articleId) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}`);
  return data;
}

export const fetchComments = async (articleId) => {
  const { data } = await axios.get(`${BASE_URL}/articles/${articleId}/comments`)
  return data;
}