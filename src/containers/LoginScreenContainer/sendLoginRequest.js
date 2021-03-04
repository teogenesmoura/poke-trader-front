import axiosInstance from '../../auth/axiosApi'
import {LOGIN_URL} from './../../api_urls'

export async function sendLoginRequest(username, password) {
  const response = await axiosInstance.post(LOGIN_URL, {
    username: username,
    password: password
  })
  return response
}
