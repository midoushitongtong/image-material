import axios from 'axios';

const instance = axios.create({
  timeout: 5000,
});

/**
 * 响应拦截器
 */
instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;
