import axiosInstance from '../../auth/axiosApi'
import {LOGIN_URL, TOKEN_VERIFY_URL, REGISTER_URL} from '../../api_urls'

export async function sendLoginRequest(username, password) {
  const response = await axiosInstance.post(LOGIN_URL, {
    username: username,
    password: password
  })
  return response
}

export async function sendRegistrationRequest(username, password, email) {
  const response = await axiosInstance.post(REGISTER_URL, {
    email: email,
    password: password,
    username: username
  })
  return response
}

export async function verifyUserToken(token) {
  const response = await axiosInstance.post(TOKEN_VERIFY_URL, {
    token: token
  })
  return response
}
