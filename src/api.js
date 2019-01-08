import axios from 'axios';

const BASE_URL = 'http://localhost:9090/api';

export const fetchArticles = async (topic) => {
  const { data } = await axios.get(`${BASE_URL}/topics/${topic}/articles`);
  console.log(data)
  return data;
}