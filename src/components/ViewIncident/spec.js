import { shallow } from 'enzyme';
import React from 'react';
import { mapDispatchToProps, mapStateToProps, ViewIncident } from './index';

describe('CreateIncident Component', () => {
  const viewIncidentFn = jest.fn();
  const props = {
    viewIncident: viewIncidentFn,
    error: '',
    message: '',
    incident: {},
  };
  const wrapper = shallow(<ViewIncident {...props} />);

  it('should render without crushing', () => {
    expect(wrapper)
      .toMatchSnapshot();
  });

  it('should map state to props', () => {
    const mockedState = {
      incidentReducer: {
        message: 'Created Successfully',
        error: '',
        incident: {},
      },
    };
    const state = mapStateToProps(mockedState);
    expect(state.message)
      .toBe('Created Successfully');
    expect(state.error)
      .toBe('');
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch)
      .viewIncident();
    expect(mockedDispatch)
      .toHaveBeenCalled();
  });
});
