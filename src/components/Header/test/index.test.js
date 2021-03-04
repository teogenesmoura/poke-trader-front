import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './../index';
import {shallow, mount} from "enzyme/build";
import ReactDOM from 'react-dom';
import MockTheme from './../../../mockTheme';

describe("<Header />", () => {
  it("with mount", () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <MockTheme>
        <Header />
      </MockTheme>,
      div
    );
  });

  it("doesnt break on button click", () => {
    const wrapper = mount(<MockTheme>
                            <Header />
                          </MockTheme>);
    ['#home','#history','#about'].forEach(item => {
      const button = wrapper.find(item).last()
      expect(button.length).toBe(1)
      button.simulate('click')
    })
  });
});
