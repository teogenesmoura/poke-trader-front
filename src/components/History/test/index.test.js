import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {USER_ENTRIES} from './../../../api_urls'
import responseMockData from './mockData'
import History from './../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MockTheme from './../../../mockTheme';
import {fetchUserEntries} from './../fetchUserEntries'

describe('Test lifecycle for retrieving an users history', () => {
  test('Tests loading history page', () => {
    const wrapper = mount(<Router><MockTheme><History /></MockTheme></Router>)
    let mockInstance = new MockAdapter(axiosInstance)
    mockInstance.onGet(USER_ENTRIES).replyOnce(200, responseMockData)
    console.log(wrapper.text())
    wrapper.update()
  })
})
