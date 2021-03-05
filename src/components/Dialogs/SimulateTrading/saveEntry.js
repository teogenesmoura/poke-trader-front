import axiosInstance from './../../../auth/axiosApi'
import {CREATE_ENTRY_USER} from './../../../api_urls'

async function sanitizeEntry(entry) {
  let result = {}
  result['id'] = entry[0].id
  result['name'] = entry[0].name
  result['base_experience'] = entry[0].base_experience
  result['type'] = process.env.REACT_APP_CREATURE_TYPE
  return result
}

export async function saveEntry(left, right, isTradeFair) {
  if(left.length === 0 || right.length === 0) return false
  let clean_left = await sanitizeEntry(left)
  let clean_right = await sanitizeEntry(right)
  const response = await axiosInstance.post(CREATE_ENTRY_USER, {
    host: clean_left,
    opponent: clean_right,
    isTradeFair: isTradeFair
  })
  return response
}
