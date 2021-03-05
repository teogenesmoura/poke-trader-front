import axiosInstance from './../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {USER_ENTRIES} from './../../api_urls'

export async function fetchUserEntries() {
  const response = await axiosInstance.get(USER_ENTRIES)
  return response
}
