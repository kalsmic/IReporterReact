import { shallow } from 'enzyme';
import React from 'react';
import { mapDispatchToProps, mapStateToProps, GetIncidents } from './index';
import { findByTestAttr } from '../../../utils';


describe('CreateIncident Component', () => {
  const viewIncidentsFn = jest.fn();
  const incidents = [
    {
      id: 'c876cadf-a673-4507-944a-a9260294c5c8',
      title: 'Fewer criminals being caught after 28% drop in detective numbers',
      comment: '<p><strong style="color: rgb(0, 0, 0);"><em><u>There were 610 fewer detectives serving in major crime and murder squads in the year to March 2019 compared with 2010</u></em></strong></p><p>People have an increasing chance of getting away with murder as figures show the number of detectives investigating the most serious offences in England and Wales has fallen by more than a quarter since austerity began.</p><p>Data obtained under freedom of information requests showed the number of detectives serving in major crime and murder squads had fallen by at least 610, or 28%, between 2010-11 and 2017-18.</p>',
      location: {
        lat: 0.363915,
        lng: 32.646550,
      },
      created_by: '0006f613-64b0-4103-a96a-e06b7e3bcde1',
      owner: 'kalsmic',
      created_on: 'Sat, 29 Jun 2019 00:00:00 GMT',
      status: 'Draft',
      type: 'red-flag',
      videos: [],
      images: []
    }
  ];
  const props = {
    viewIncidents: viewIncidentsFn,
    error: '',
    message: '',
    incidents,
    isLoading: false,
    match: {
      params: {
        incidentType: 'red-flags'
      }
    }
  };
  const wrapper = shallow(<GetIncidents {...props} />);

  it('should render without crushing', () => {
    expect(wrapper)
      .toMatchSnapshot();
  });

  it('should call view incidents on ComponentDidMount', async () => {
    await wrapper.instance().componentDidMount();
    expect(viewIncidentsFn).toBeCalled();
    expect(viewIncidentsFn).toBeCalledTimes(1);
  });


  it('should an image loader when loading', () => {
    const loader = '<i class="fa fa-3x fa-spinner fa-spin" data-test="imageLoader"></i>';

    expect(findByTestAttr(wrapper, 'imageLoader').exists()).toBe(false);

    wrapper.setProps({ isLoading: true });

    expect(findByTestAttr(wrapper, 'imageLoader').html()).toBe(loader);
    expect(findByTestAttr(wrapper, 'imageLoader').exists()).toBe(true);
  });

  it('should map state to props', () => {
    const mockedState = {
      incidentReducer: {
        isLoading: false,
        incidents: [],
      },
    };
    const state = mapStateToProps(mockedState);
    expect(state.incidents)
      .toStrictEqual([]);
    expect(state.isLoading).toBe(false);
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch)
      .viewIncidents();
    expect(mockedDispatch)
      .toHaveBeenCalled();
  });
});
