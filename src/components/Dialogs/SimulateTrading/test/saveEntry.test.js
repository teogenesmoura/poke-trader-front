import axiosInstance from './../../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {CREATE_ENTRY_USER} from './../../../../api_urls'
import mockData from './mockData'
import {saveEntry} from './../saveEntry'

describe('Test requisitions to save simulation entries in the db', () => {
  test("Test if sending a valid request returns a valid response", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(CREATE_ENTRY_USER).replyOnce(200, mockData.success)
    data = await saveEntry([mockData.left], [mockData.right], true)
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.status).toBe(200)
    mock.restore()
  })

  test("Test if sending an invalid request returns a invalid response", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(CREATE_ENTRY_USER).replyOnce(500, mockData.fail)
    data = await saveEntry([mockData.left], [mockData.right], true)
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.response.status).toBe(500)
    mock.restore()
  })

  test("Test sending data with length 0", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onPost(CREATE_ENTRY_USER).replyOnce(500, mockData.fail)
    data = await saveEntry("", "", true)
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data).toBe(false)
    mock.restore()
  })
})
