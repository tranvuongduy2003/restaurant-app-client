import axios, { AxiosRequestConfig } from 'axios';
import { getAccessToken, refreshToken } from 'utils/auth';

type IConfig = AxiosRequestConfig;

const axiosClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: IConfig) {
    const token = getAccessToken();
    if (token) {
      config.headers = {
        'Authorization': `Bearer ${token}`,
      };
    }
    return config;
  },
  function (error: any) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: any) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (err: any) {
    const originalConfig = err.config;

    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const accessToken = await refreshToken();
          axiosClient.defaults.headers.common = {
            'Authorization': `Bearer ${accessToken}`,
          };

          return axiosClient(originalConfig);
        } catch (error: any) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }

          return Promise.reject(error);
        }
      }
    }

    console.log(err);
    return Promise.reject(err.response.data);
  }
);

export default axiosClient;
