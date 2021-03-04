import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {REGISTER_URL} from './../../../api_urls'
import responseMockData from './mockData'
import {sendRegistrationRequest} from './../sendRegistrationRequest'
import RegisterScreen from '../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MockTheme from './../../../mockTheme';

describe('Test registration Lifecycle', () => {
  const { location } = window;

  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
    });

  afterAll(() => {
   window.location = location;
  });

  test("Test if registration function get called succesfully", async() => {
    let mockInstance = new MockAdapter(axiosInstance)
    await mockInstance.onPost(REGISTER_URL).reply(201, responseMockData)

    const wrapper = mount(<Router><MockTheme><RegisterScreen/></MockTheme></Router>)
    const usernameField = wrapper.find('input').at(0)
    usernameField.instance().value = "test_user"
    usernameField.simulate("change")
    const emailField = wrapper.find('input').at(1)
    emailField.instance().value = "test_user@user.com"
    emailField.simulate("change")
    const passwordField = wrapper.find('input').at(2)
    passwordField.instance().value = "test_user"
    passwordField.simulate("change")
    const button = wrapper.find("button").at(0);
    button.simulate('click')
  })

  test("Test if registration function gets error from server", async() => {
    let mockInstance = new MockAdapter(axiosInstance)
    await mockInstance.onPost(REGISTER_URL).reply(500)

    const wrapper = mount(<Router><MockTheme><RegisterScreen/></MockTheme></Router>)
    const usernameField = wrapper.find('input').at(0)
    usernameField.instance().value = "test_user"
    usernameField.simulate("change")
    const emailField = wrapper.find('input').at(1)
    emailField.instance().value = "test_user@user.com"
    emailField.simulate("change")
    const passwordField = wrapper.find('input').at(2)
    passwordField.instance().value = "test_user"
    passwordField.simulate("change")
    const button = wrapper.find("button").at(0);
    button.simulate('click')
  })
})
