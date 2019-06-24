import React from 'react';
import PropTypes from 'prop-types';
import {
  Map, Marker, Popup, TileLayer
} from 'react-leaflet';

const ViewIncidentMap = (props) => {
  const {
    latlng, mapClassName,
  } = props;

  return (

    <Map
      center={latlng}
      length={4}
      zoom={13}
      className={mapClassName}
    >

      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={latlng} draggable>
        <Popup>
          {' '}
          Current location:
          <pre>{JSON.stringify(latlng, null, 2)}</pre>
        </Popup>
      </Marker>
    </Map>
  );
};

ViewIncidentMap.propTypes = {
  mapClassName: PropTypes.string.isRequired,
  latlng: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,

};
export default ViewIncidentMap;
