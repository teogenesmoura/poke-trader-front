import axiosInstance from './../../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {POKE_API_SEARCH_BY_NAME_URL} from './../../../../api_urls'
import responseMockData from './mockData'
import {retrieveResourceByName} from './../thirdPartyAPI'

describe('Test login requisitions', () => {
  test("Tests retrieving a resource from an external API", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onGet(POKE_API_SEARCH_BY_NAME_URL).replyOnce(200, responseMockData)
    data = await retrieveResourceByName("ditto")
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    mock.restore()
  })

  test("Doesnt break when not passing an argument", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onGet(POKE_API_SEARCH_BY_NAME_URL).replyOnce(200, responseMockData)
    data = await retrieveResourceByName("")
    expect(data).toBe("")
    expect(data.length).toBe(0)
    mock.restore()
  })
})
