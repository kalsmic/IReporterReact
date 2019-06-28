import { shallow } from 'enzyme';
import React from 'react';
import { CreateIncident, mapDispatchToProps, mapStateToProps } from './index';
import { findByTestAttr } from '../../../utils';

describe('CreateIncident Component', () => {
  const newIncidentFn = jest.fn();
  const props = {
    newIncident: newIncidentFn,
    error: {},
    message: '',
    incident: {},
    isLoading: false,
  };
  const wrapper = shallow(<CreateIncident {...props} />);

  it('should render without crushing', () => {
    expect(wrapper)
      .toMatchSnapshot();
  });

  it('should handle the onchange event', () => {
    const event = {
      target: {
        name: 'title',
        value: 'my first title',
      },
    };

    wrapper.instance()
      .handleChange(event);
    expect(wrapper.instance().state.title)
      .toBe(event.target.value);
  });

  it('should handle the onSubmit event', () => {
    const instance = wrapper.instance();
    wrapper.setState({
      title: '',
      comment: ''
    });
    const event = {
      target: {
        type: 'submit',
        name: 'login',
      },
      preventDefault: jest.fn(),
    };

    instance.handleSubmit(event);
    expect(instance.props.newIncident)
      .not
      .toBeCalled();
    wrapper.setState({
      title: 'Incident Title',
      comment: 'My comment',

      incidentLocation: [12, 90],
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
      hasLocation: false,
      incidentType: 'red-flag',
    });
    instance.handleSubmit(event);
    expect(instance.props.newIncident)
      .toBeCalled();
    expect(instance.props.newIncident)
      .toBeCalledWith(
        'Incident Title', 'My comment', [12, 90], 'red-flag',
      );
  });

  it('should show messages to the user', () => {
    const error = {
      title: 'titleError',
      comment: 'commentError',
      location: 'locationError',
    };
    wrapper.setProps({
      error,
      message: 'incident created Successfully',
      isLoading: true
    });
    expect(findByTestAttr(wrapper, 'titleError')
      .text())
      .toBe(error.title);
    expect(findByTestAttr(wrapper, 'commentError')
      .text())
      .toBe(error.comment);
    expect(findByTestAttr(wrapper, 'locationError')
      .text())
      .toBe(error.location);
    expect(findByTestAttr(wrapper, 'locationError')
      .text())
      .toBe(error.location);
    expect(findByTestAttr(wrapper, 'locationError')
      .text())
      .toBe(error.location);
  });


  it('should map state to props', () => {
    const mockedState = {
      incidentReducer: {
        message: 'Created Successfully',
        isLoading: false,
        error: '',
        incident: {},
      },
    };
    const state = mapStateToProps(mockedState);
    expect(state.message)
      .toBe('Created Successfully');
    expect(state.isLoading)
      .toBe(false);
    expect(state.error)
      .toBe('');
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch)
      .newIncident();
    expect(mockedDispatch)
      .toHaveBeenCalled();
  });
});
