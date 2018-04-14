import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import {
  Key,
  Octave,
  Piano
} from './index';

describe('Piano Components', () => {
  it('component: Key should render correctly', () => {
    const wrapper = shallow(<Key onPress={() => {}} keyNames={['C']} />);
    expect(wrapper.find('.Key-container')).to.have.length(1);
  });

  it('component: Octave should render correctly', () => {
    const wrapper = shallow(<Octave />);
    expect(wrapper.find('.Octave-container')).to.have.length(1);
  });

  it('component: Piano should render correctly', () => {
    const wrapper = shallow(<Piano numOctaves={3} onPress={() => {}} />);
    expect(wrapper.find('.Piano-container')).to.have.length(1);
    expect(wrapper.find(Octave)).to.have.length(3);
  });
});
