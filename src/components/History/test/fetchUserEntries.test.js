import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {USER_ENTRIES} from './../../../api_urls'
import responseMockData from './mockData'
import {fetchUserEntries} from './../fetchUserEntries'

describe('Test Fetching User entries', () => {
  test("Tests retrieving entries", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onGet(USER_ENTRIES).replyOnce(200, responseMockData)
    data = await fetchUserEntries()
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.status).toBe(200)
    mock.restore()
  })
})
