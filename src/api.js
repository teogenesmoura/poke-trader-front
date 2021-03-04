import axiosInstance from './auth/axiosApi'
import {LOGIN_URL, APPLICATION_SERVER_API_BASE_URL, TOKEN_STATUS_URL, REGISTER_URL} from './api_urls'

export async function verifyUserToken(token) {
  const url = APPLICATION_SERVER_API_BASE_URL + TOKEN_STATUS_URL
  const access_token = "Bearer " + localStorage.getItem('access_token')
  const response = await axiosInstance.get(url, {
    headers: {
      'Authorization': access_token
    }
  })
  return response
}
