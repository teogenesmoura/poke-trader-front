import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {LOGIN_URL} from './../../../api_urls'
import responseMockData from './mockData'
import {sendLoginRequest} from './../sendLoginRequest'
import LoginScreen from '../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MockTheme from './../../../mockTheme';

describe('Test login Lifecycle', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
    });

  afterAll(() => {
   window.location = location;
  });

  test("Test if login function get called succesfully", async() => {
    let mockInstance = new MockAdapter(axiosInstance)
    await mockInstance.onPost(LOGIN_URL).reply(200, responseMockData)

    const wrapper = mount(<Router><MockTheme><LoginScreen/></MockTheme></Router>)
    const emailField = wrapper.find('input').at(0)
    emailField.instance().value = "test_user"
    emailField.simulate("change")
    const passwordField = wrapper.find('input').at(1)
    passwordField.instance().value = "test_user"
    passwordField.simulate("change")
    const button = wrapper.find("button").at(0);
    button.simulate('click')
  })

  test("Test if login function gets error from server", async() => {
    let mockInstance = new MockAdapter(axiosInstance)
    await mockInstance.onPost(LOGIN_URL).reply(500)

    const wrapper = mount(<Router><MockTheme><LoginScreen/></MockTheme></Router>)
    const emailField = wrapper.find('input').at(0)
    emailField.instance().value = "test_user"
    emailField.simulate("change")
    const passwordField = wrapper.find('input').at(1)
    passwordField.instance().value = "test_user"
    passwordField.simulate("change")
    const button = wrapper.find("button").at(0);
    button.simulate('click')
  })
})
