import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {REGISTER_URL} from './../../../api_urls'
import responseMockData from './mockData'
import {sendRegistrationRequest} from './../sendRegistrationRequest'

describe('Test register requisitions', () => {
  test("Test if registration post request works correctly", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(REGISTER_URL).replyOnce(200, responseMockData)

    data = await  sendRegistrationRequest("test_user", "test_user@test.com", "test_user")
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    mock.restore()
  })

  test("Test registration endpoint returning error", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(REGISTER_URL).replyOnce(500, responseMockData)
    data = await  sendRegistrationRequest("test_user", "test_user@test.com", "test_user")
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.response.status).toBe(500)
    mock.restore()
  })
})
