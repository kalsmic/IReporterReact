import React from 'react';
import PropTypes from 'prop-types';
import {
  Map, Marker, Popup, TileLayer
} from 'react-leaflet';

const IncidentMap = (props) => {
  const {
    hasLocation, handleMapClick, latlng, mapReference, mapClassName
  } = props;

  return (

    <Map
      center={latlng}
      length={4}
      onClick={handleMapClick}
      onLocationfound={handleMapClick}
      ref={mapReference}
      zoom={13}
      className={mapClassName}
    >

      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {hasLocation ? (
        <Marker position={latlng} draggable>
          <Popup>
            {' '}
              Current location:
            <pre>{JSON.stringify(latlng, null, 2)}</pre>
          </Popup>
        </Marker>
      ) : ''
        }

    </Map>
  );
};
IncidentMap.propTypes = {
  hasLocation: PropTypes.bool.isRequired,
  mapClassName: PropTypes.string.isRequired,
  handleMapClick: PropTypes.func.isRequired,
  latlng: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  mapReference: PropTypes.shape({}).isRequired,

};
export default IncidentMap;
