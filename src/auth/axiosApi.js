import axios from 'axios'
import {APPLICATION_SERVER_API_BASE_URL} from './../api_urls'

const axiosInstance = axios.create({
  baseURL: APPLICATION_SERVER_API_BASE_URL,
  headers: {
    'Authorization': localStorage.getItem('access_token') ? "Bearer " + localStorage.getItem('access_token') : null,
    'Content-Type': 'application/json',
  }
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return error
  }
)

export default axiosInstance;
