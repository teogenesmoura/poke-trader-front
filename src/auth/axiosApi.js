import axios from 'axios'
import {APPLICATION_SERVER_API_BASE_URL, TOKEN_STATUS_URL} from './../api_urls'

const axiosInstance = axios.create({
  baseURL: APPLICATION_SERVER_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

axiosInstance.interceptors.response.use(
  response => {
    console.log("response")
    console.log(response)
    return response
  },
  error => {
    const originalRequest = error.config
    console.log("error")
    console.log(error)
  }
)

export default axiosInstance;
