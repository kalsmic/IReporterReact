import React from 'react';
import { shallow } from 'enzyme';
import NavBar from './index';
import { findByTestAttr } from '../../../utils';


describe('NavBar', () => {
  const component = shallow(<NavBar />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });

  it('should clear the user session on logout', () => {
    const logoutLink = findByTestAttr(component, 'logout');
    const logoutfn = jest.fn();
    logoutLink.simulate('click');
    console.log(component.debug());
  });
});
