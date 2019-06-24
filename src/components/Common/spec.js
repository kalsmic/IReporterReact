import { shallow } from 'enzyme';
import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Root from './Root';

describe('CreateIncident Component', () => {
  const divComponent = <div>my Div</div>;
  const footer = shallow(<Footer />);
  const header = shallow(<Header />);
  const root = shallow(<Root>divComponent</Root>);


  it('should render without crushing', () => {
    expect(header).toMatchSnapshot();
    expect(footer).toMatchSnapshot();
    expect(root).toMatchSnapshot();
  });

  it('should wrap its children', () => {
    expect(root.text()).toBe('<Header /><NavBar />divComponent<Footer />');
  });
});
