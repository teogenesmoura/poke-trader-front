import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import axiosInstance from './../../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {POKE_API_SEARCH_BY_NAME_URL} from './../../../../api_urls'
import responseMockData from './mockData'
import SearchCreature from '../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MockTheme from './../../../../mockTheme';
import mockData from './mockData'

describe('Test lifecycle for searching a creature on the external API', () => {

  test('Tests typing in the name of a pokemon and searching for it', () => {
    const wrapper = mount(<Router><MockTheme><SearchCreature open={true} left={[mockData.left]} right={[mockData.left]} /></MockTheme></Router>)
    const textField = wrapper.find('input').at(0)
    let mockInstance = new MockAdapter(axiosInstance)
    mockInstance.onGet(POKE_API_SEARCH_BY_NAME_URL).reply(200, mockData)
    textField.instance().value = "ditto"
    textField.simulate("change")
    const button = wrapper.find("button").at(1)
    button.simulate('click')
  })

  test('Tests sending an empty pokemon name and searching for it', () => {
    const wrapper = mount(<Router><MockTheme><SearchCreature open={true} left={[mockData.left]} right={[mockData.left]} /></MockTheme></Router>)
    const textField = wrapper.find('input').at(0)
    textField.instance().value = ""
    textField.simulate("change")
    const button = wrapper.find("button").at(1)
    button.simulate('click')
  })

  test('Tests if closing the modal doesnt break page', () => {
    const wrapper = mount(<Router><MockTheme><SearchCreature open={true} left={[mockData.left]} right={[mockData.left]} /></MockTheme></Router>)
    const button = wrapper.find("button").at(0)
    button.simulate('click')
  })
})
