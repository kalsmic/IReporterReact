import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import renderHTML from 'react-render-html';


import { getIncident } from '../../store/actions/incidentActions';
import './style.scss';
import ViewIncidentMap from '../Map/viewIncident';
import Root from '../Common/Root';

export class ViewIncident extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
  }

  componentDidMount() {
    const { viewIncident, match: { params: { incidentType, incidentUUID } } } = this.props;
    viewIncident(incidentUUID, incidentType);
  }

  render() {
    const {
      incident,
    } = this.props;

    const {
      title,
      owner: createdBy,
      created_on: createdOn,
      status,
      comment,
      location: myLocation,
    } = incident;


    return (
      <Root>

        <h3 className="text-blue bd_line_bottom">
          View Incident Record Details
        </h3>
        <div className="incident__card" />
        <div className="incident__card-header">
          <p className="incident__card-title">
            Title:
            <b>{title}</b>
          </p>

          <p>
            Created On:
            {createdOn}
          </p>

        </div>
        <div className="incident__card-comment">{comment && renderHTML(comment)}</div>

        <div className="incident__card-map ">
          {myLocation && (
            <ViewIncidentMap
              latlng={myLocation}
              mapClassName="incident__form__map"
              mapRef={this.mapRef}
            />
          )}
        </div>
        <div className="incident__card-footer">

          <p className="incident__card-status">{status}</p>
          <p>
            {' '}
            Created by :
            {createdBy}
          </p>
        </div>


      </Root>
    );
  }
}


ViewIncident.propTypes = {
  viewIncident: PropTypes.func.isRequired,
  incident: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    comment: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    created_by: PropTypes.string,
    created_on: PropTypes.string,
    type: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      incidentUUID: PropTypes.string.isRequired,
      incidentType: PropTypes.string.isRequired,
    }),
  }).isRequired,

};

export const mapStateToProps = (state) => {
  const {
    incidentReducer: {
      incident, message, error,
    },
  } = state;
  return {
    incident,
    message,
    error,
  };
};

export const mapDispatchToProps = dispatch => ({

  viewIncident: (incidentUUID, incidentType) => dispatch(
    getIncident(incidentUUID, incidentType),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewIncident);
