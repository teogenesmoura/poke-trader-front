import axiosInstance from '../../auth/axiosApi'
import {POKE_API_SEARCH_BY_NAME_URL} from './../../api_urls'

export async function retrieveResourceByName(name) {
  if(!name) return ''
  const url = POKE_API_SEARCH_BY_NAME_URL + name
  const response = await axiosInstance.get(url)
  if(response.status === 200) {
    return response
  }
  return ''
}
