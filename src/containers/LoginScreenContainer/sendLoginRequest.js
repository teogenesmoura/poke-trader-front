import axiosInstance from '../../auth/axiosApi'
import {LOGIN_URL, TOKEN_VERIFY_URL} from '../../api_urls'

export async function sendLoginRequest(email, password) {
  const response = await axiosInstance.post(LOGIN_URL, {
    email: email,
    password: password
  })
  console.log(response)
  return response
}

export async function verifyUserToken(token) {
  const response = await axiosInstance.post(TOKEN_VERIFY_URL, {
    token: token
  })
  return response 
}
