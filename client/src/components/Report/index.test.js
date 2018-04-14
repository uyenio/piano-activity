import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ReactTable from 'react-table';
import Report from './index';

describe('Report Component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Report />);
    expect(wrapper.find(ReactTable)).to.have.length(1);
  });
});
