import React from 'react';
import { shallow } from 'enzyme';
import IReporterApp from '../components/App';


describe('<IReporterApp Component', () => {
  const component = shallow(<IReporterApp />);

  it('should render without crashing', () => {
    expect(component).toMatchSnapshot();
  });
});
