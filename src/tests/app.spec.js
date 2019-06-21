import React from 'react';
import { shallow } from 'enzyme';
import { findByTestAttr } from '../../utils';
import IReporterApp from '../components/App';

const setUp = () => {
  const component = shallow(<IReporterApp />);
  return component;
};

describe('Welcome Header', () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it('should render without errors', () => {
    const wrapper = findByTestAttr(component, 'welcomeHeader');

    expect(wrapper.length).toBe(1);
  });

  it('renders welcome message', () => {
    const wrapper = findByTestAttr(component, 'welcomeHeader');
    const welcome = (
      <h1>
        Welcome to
        {' '}
        <span id="logo">iReporter</span>
        {' '}
React
      </h1>
    );
    expect(wrapper.contains(welcome)).toBe(true);
    expect(wrapper.contains(welcome)).toEqual(true);
  });
});
