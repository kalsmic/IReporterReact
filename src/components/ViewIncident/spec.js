import { shallow } from 'enzyme';
import React from 'react';
import { mapDispatchToProps, mapStateToProps, ViewIncident } from './index';
import { formatDate } from '../../../utils';

describe('CreateIncident Component', () => {
  const viewIncidentFn = jest.fn();
  const props = {
    viewIncident: viewIncidentFn,
    error: '',
    message: '',
    incident: {},
    match: {
      params: {
        incidentType: 'red-flag',
        incidentUUID: 'incidentUUID'
      }
    }
  };
  const wrapper = shallow(<ViewIncident {...props} />);

  it('should render without crushing', () => {
    expect(wrapper)
      .toMatchSnapshot();
  });

  it('should call view incidents on ComponentDidMount', async () => {
    await wrapper.instance().componentDidMount();
    expect(viewIncidentFn).toBeCalled();
    expect(viewIncidentFn).toBeCalledTimes(1);
  });

  it('should show incident record details', () => {
    const incident = {
      title: 'incident Title',
      owner: 'owners name',
      createdBy: 'data',
      created_on: 'Sat, 29 Jun 2019 00:00:00 GMT',
      status: 'draft',
      comment: 'my comment',
      location: {
        lat: 23,
        lng: 93
      },
    };
    wrapper.setProps({ incident });
    expect(
      wrapper.find('.incident__card__header__title').text()
    ).toBe(incident.title);

    expect(
      wrapper.find('.incident__card__header__created_on').text()
    ).toBe('Created On: '.concat(formatDate('Sat, 29 Jun 2019 00:00:00 GMT')));

    expect(
      wrapper.find('.incident__card-comment').text()
    ).toBe(incident.comment);

    expect(
      wrapper.find('.incident__card-status').text()
    ).toBe('status:  draft');

    expect(
      wrapper.find('.incident__card-owner').text()
    ).toBe('Created by : owners name');
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
