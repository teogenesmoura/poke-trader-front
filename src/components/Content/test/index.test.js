import React from 'react'
import { render } from '@testing-library/react'
import { mount } from 'enzyme'
import axiosInstance from './../../../auth/axiosApi.js'
import MockAdapter from 'axios-mock-adapter'
import {LOGIN_URL} from './../../../api_urls'
import Content from '../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import MockTheme from './../../../mockTheme';

describe('Test Content Component', () => {
  test("Test if the component mounts succesfully", async() => {
    const wrapper = mount(<Router><MockTheme><Content/></MockTheme></Router>)
  })
})
