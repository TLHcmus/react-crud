import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://reqres.in/api/',
  headers: {
    'x-api-key': 'reqres-free-v1',
  },
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // If request method is delete
    if (response.config.method === 'delete') {
      return response;
    }
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
