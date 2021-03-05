import axiosInstance from './../../auth/axiosApi'
import {LOGOUT_URL, INITIAL_PAGE_PATH} from './../../api_urls'

export async function logout() {
  const response = await axiosInstance.post(LOGOUT_URL)
  if (response.status === 200) {
    window.location.assign(INITIAL_PAGE_PATH)
  }
  return response
}
