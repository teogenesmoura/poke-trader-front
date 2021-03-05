import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {LOGOUT_URL} from './../../../api_urls'
import responseMockData from './mockData'
import {logout} from './../logout'

describe('Test Logout requisitions', () => {
  test("Tests logging out", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(LOGOUT_URL).replyOnce(200, responseMockData)
    data = await logout()
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.status).toBe(200)
    mock.restore()
  })
})
