import axiosInstance from './auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {TOKEN_STATUS_URL, APPLICATION_SERVER_API_BASE_URL} from './api_urls'
import {verifyUserToken} from './api'
let token_status_success_response = {
    "message": {
        "date_created": "Wed, 03 Mar 2021 03:35:00 GMT",
        "email": "test_user@test_user.com",
        "user_id": 7
    },
    "status": "success"
}
let token_status_failure_response = {
    "message": "Provide a valid auth token.",
    "status": "fail"
}


describe('Test get token status', () => {
  test("Tests succesfully retrieving a token status", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MTUwNjg3NDAsImlhdCI6MTYxNDgwOTU0MCwic3ViIjo3fQ.-8_kRbI6_XVVjAWPcJg2PGXlhlGalVYBmH95KMbn3PY'
    const access_token = "Bearer " + token
    mock.onGet(APPLICATION_SERVER_API_BASE_URL + TOKEN_STATUS_URL).replyOnce(200, token_status_success_response)
    data = await verifyUserToken()
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.status).toBe(200)
    mock.restore()
  })
  test("Tests not being able to retrieve a token status", async() => {
    let data = null
    let mock = new MockAdapter(axiosInstance)
    mock.onGet(APPLICATION_SERVER_API_BASE_URL + TOKEN_STATUS_URL).replyOnce(500, token_status_failure_response)
    data = await verifyUserToken()
    expect(data).not.toBeNull()
    expect(data).not.toBeUndefined()
    expect(data.response.status).toBe(500)
    mock.restore()
  })
})
