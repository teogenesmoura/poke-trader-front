import axiosInstance from './../../auth/axiosApi.js'
import {REGISTER_URL} from './../../api_urls'

export async function sendRegistrationRequest(username, password, email) {
  const response = await axiosInstance.post(REGISTER_URL, {
    email: email,
    password: password,
    username: username
  })
  return response
}
