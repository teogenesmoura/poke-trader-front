import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import axiosInstance from './../../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {CREATE_ENTRY_USER} from './../../../../api_urls'
import responseMockData from './mockData'
import SimulateTrading from '../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MockTheme from './../../../../mockTheme';
import mockData from './mockData'

describe('Test lifecycle for simulating a trade and persisting it', () => {

  //we compare a pokemon against himself
  test('calculates correctly a fair trade', () => {
    const wrapper = mount(<Router><MockTheme><SimulateTrading open={true} left={[mockData.left]} right={[mockData.left]} /></MockTheme></Router>)
    wrapper.update()
    expect(wrapper.text().includes('Your trade')).toBe(true)
  })

  //we compare a pokemon with base experience 101 to one with base experience 240
  test('calculates correctly an unfair trade', () => {
    const wrapper = mount(<Router><MockTheme><SimulateTrading open={true} left={[mockData.left]} right={[mockData.right]} /></MockTheme></Router>)
    wrapper.update()
  })

  test('clicking on save to history button works', () => {
    const wrapper = mount(<Router><MockTheme><SimulateTrading open={true} left={[mockData.left]} right={[mockData.right]} /></MockTheme></Router>)
    wrapper.update()
    let mockInstance = new MockAdapter(axiosInstance)
    mockInstance.onPost(CREATE_ENTRY_USER).reply(200, mockData.success)
    const button = wrapper.find("button").at(0)
    button.simulate('click')
  })

  test('snackbar appears when a failure happens', () => {
    const wrapper = mount(<Router><MockTheme><SimulateTrading open={true} left={[mockData.left]} right={[mockData.right]} /></MockTheme></Router>)
    wrapper.update()
    let mockInstance = new MockAdapter(axiosInstance)
    mockInstance.onPost(CREATE_ENTRY_USER).reply(500, mockData.fail)
    const button = wrapper.find("button").at(0)
    button.simulate('click')
    wrapper.update()

  })
})
