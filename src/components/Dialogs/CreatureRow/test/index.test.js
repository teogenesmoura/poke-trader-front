import React from 'react'
import { mount } from 'enzyme'
import CreatureRow from '../index'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import MockTheme from './../../../../mockTheme'
import creature from './mockData'

describe('Test Creature Row component', () => {

  test('Tests rendering the CreatureRow Component', () => {
    let fn = jest.fn()
    const wrapper = mount(<Router><MockTheme><CreatureRow creature={creature} pokemonIChooseYou={fn}/></MockTheme></Router>)
  })

  test('Tests adding a pokemon the CreatureRow Component', () => {
    let fn = jest.fn()
    const wrapper = mount(<Router><MockTheme><CreatureRow creature={creature} pokemonIChooseYou={fn}/></MockTheme></Router>)
    const button = wrapper.find("button").at(0)
    button.simulate('click')
    expect(fn).toHaveBeenCalled()
  })
  //
  // test('Tests sending an empty pokemon name and searching for it', () => {
  //   const wrapper = mount(<Router><MockTheme><SearchCreature open={true} left={[mockData.left]} right={[mockData.left]} /></MockTheme></Router>)
  //   const textField = wrapper.find('input').at(0)
  //   textField.instance().value = ""
  //   textField.simulate("change")
  //   const button = wrapper.find("button").at(1)
  //   button.simulate('click')
  // })
  //
  // test('Tests if closing the modal doesnt break page', () => {
  //   const wrapper = mount(<Router><MockTheme><SearchCreature open={true} left={[mockData.left]} right={[mockData.left]} /></MockTheme></Router>)
  //   const button = wrapper.find("button").at(0)
  //   button.simulate('click')
  // })
})
