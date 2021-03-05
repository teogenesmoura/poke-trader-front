import axiosInstance from './../../../auth/axiosApi'
import {CREATE_ENTRY_USER} from './../../../api_urls'

async function sanitizeEntry(entries) {
  let result = []
  entries.forEach(entry =>  {
    let curr = {}
    curr['id'] = entry.id
    curr['name'] = entry.name
    curr['base_experience'] = entry.base_experience
    curr['type'] = process.REACT_APP_CREATURE_TYPE
    result.push(curr)
  })
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
