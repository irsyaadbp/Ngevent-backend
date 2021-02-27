import Axios from 'axios';
import Config from 'react-native-config';

const server = Axios.create({
  baseURL: Config.API_URL,
  timeout: 10000,
});

server.interceptors.request.use(
  async (request) => {
    if (__DEV__) {
      console.log('Starting Request', JSON.stringify(request, null, 2));
    }
    return request;
  },
  (error) => {
    if (__DEV__) {
      console.log('Error Request', JSON.stringify(error, null, 2));
    }
    return Promise.reject(error);
  },
);

server.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('Response:', JSON.stringify(response, null, 2));
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.log('Error Response', JSON.stringify(error, null, 2));
    }
    return Promise.reject(error);
  },
);

export default server;
