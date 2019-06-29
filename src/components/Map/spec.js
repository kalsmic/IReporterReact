import React from 'react';
import { shallow } from 'enzyme';
import { Map, Marker } from 'react-leaflet';
import IncidentMap from './index';
import ViewIncidentMap from './viewIncident';


describe('Incident Map', () => {
  const props = {
    hasLocation: true,
    handleMapClick: jest.fn(),
    latlng: {
      lat: 12,
      lng: 120
    },
    mapReference: {

    },
    mapClassName: 'mapClassName',
  };

  let wrapper = shallow(<IncidentMap {...props} />);

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a map', () => {
    expect(wrapper.find(Map).exists());
  });

  it('should show a marker if location is present', () => {
    expect(wrapper.find(Marker).exists());
    expect(wrapper.find(Marker).text()).toContain(12);
    expect(wrapper.find(Marker).text()).toContain(120);

    props.hasLocation = false;

    wrapper = shallow(<IncidentMap {...props} />);
    expect(wrapper.find(Marker).exists()).toBe(false);
  });
});


describe('View Incident Map', () => {
  const props = {
    latlng: {
      lat: 23,
      lng: 24
    },
    mapClassName: 'mapClassName',
  };

  const wrapper = shallow(<ViewIncidentMap {...props} />);

  it('should render without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render a map', () => {
    expect(wrapper.find(Map).exists());
  });

  it('should show a marker if locatin is present', () => {
    expect(wrapper.find(Marker).exists());
    expect(wrapper.find(Marker).text()).toContain(23);
    expect(wrapper.find(Marker).text()).toContain(24);
  });
});
