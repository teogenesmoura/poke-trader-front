import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {LOGIN_URL} from './../../../api_urls'
import responseMockData from './mockData'
import {sendLoginRequest} from './../sendLoginRequest'

describe('Test login requisitions', () => {
  test("Test if login returns 200 when it has worked correctly", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(LOGIN_URL).replyOnce(200, responseMockData)

    data = await  sendLoginRequest("test_user", "test_user")
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    mock.restore()
  })
})
