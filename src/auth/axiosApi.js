import axios from 'axios'
import {APPLICATION_SERVER_API_BASE_URL, TOKEN_STATUS_URL} from './../api_urls'

const axiosInstance = axios.create({
  baseURL: APPLICATION_SERVER_API_BASE_URL,
  headers: {
    'Authorization': localStorage.getItem('access_token') ? "JWT " + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
})

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config
    console.log(error)
  }
)

export default axiosInstance;
