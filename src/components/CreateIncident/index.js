import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


import { createIncident } from '../../store/actions/incidentActions';

import IncidentMap from '../Map';

import './CreateIncident.scss';
import Root from '../Common/Root';

export class CreateIncident extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      title: '',
      comment: '',
      incidentLocation: [],
      latlng: {
        lat: 0.3428767,
        lng: 32.5915189,
      },
      hasLocation: false,
      incidentType: '',
    };
  }

  handleMapClick = (e) => {
    const map = this.mapRef.current;

    const currentLocation = e.latlng;

    if (map != null) {
      map.leafletElement.locate();

      this.setState({
        latlng: currentLocation,
        hasLocation: true,
        incidentLocation: [currentLocation.lat, currentLocation.lng],

      });
    }
  };


  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();


    const {
      title,
      comment,
      incidentLocation,
      incidentType,

    } = this.state;

    const { newIncident } = this.props;


    if (
      title
      && comment
      && incidentLocation
      && incidentType


    ) {
      newIncident(
        title,
        comment,
        incidentLocation,
        incidentType,
      );
    }
  };

  handleChangeComment = (comment) => {
    this.setState({ comment });
  };

  render() {
    const {
      title, comment, incidentType, latlng, hasLocation,
    } = this.state;
    const {
      isLoading,
      message,
      error,
      incident: { id: incidentUUID, type: newIncidentType },
      history,
    } = this.props;

    const {
      title: titleError, comment: commentError, location: locationError,
    } = error;

    if (message) {
      setTimeout(() => {
        history.push(`${newIncidentType}/${incidentUUID}`);
      }, 1000);
    }


    return (
      <Root>
        <h3 className="text-blue bd_line_bottom">New Incident Record</h3>

        <form className="incident__form" onSubmit={this.handleSubmit}>
          <span className="incident__form__label">Type of Incident : </span>

          <select
            className="incident__form__input"
            value={incidentType}
            onChange={this.handleChange}
            required
            name="incidentType"
          >
            <option value="">Please Select Incident type</option>
            <option value="red-flag">Red-flag</option>
            <option value="intervention">Intervention</option>
          </select>

          <span className="incident__form__label">Title</span>
          <input
            type="text"
            className="incident__form__input"
            onChange={this.handleChange}
            value={title}
            name="title"
            placeholder="What the incident is about ?"
            required
          />
          {titleError && <p data-test="titleError">{titleError}</p>}

          <span className="incident__form__label">Comment </span>

          <div className="incident__form__input" id="commentWys">


            <ReactQuill
              value={comment}
              onChange={this.handleChangeComment}
            />
          </div>
          {commentError && <p data-test="commentError">{commentError}</p>}

          {locationError && <p data-test="locationError">{locationError}</p>}
          <IncidentMap
            latlng={latlng}
            handleMapClick={this.handleMapClick}
            mapReference={this.mapRef}
            hasLocation={hasLocation}
            mapClassName="incident__form__map"
          />
          <div className="incident__form__footer">
            <div className="incident__form__footer__message">
              {message && (message)}
            </div>
            <button
              type="submit"
              className="btn bg-green text-white "
            >
              Add Incident Record
              {' '}
              {isLoading && <i className="fa fa-spinner fa-spin" data-test="imageLoader" />}


            </button>

          </div>

        </form>
      </Root>

    );
  }
}

CreateIncident.propTypes = {
  newIncident: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  error: PropTypes.shape({}).isRequired,
  isLoading: PropTypes.bool.isRequired,
  incident: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({}).isRequired,


};

export const mapStateToProps = (state) => {
  const {
    incidentReducer: {
      incident, isLoading, message, error,
    },
  } = state;
  return {
    incident,
    isLoading,
    message,
    error,
  };
};

export const mapDispatchToProps = dispatch => ({

  newIncident: (
    title, comment, incidentLocation, incidentType,
  ) => dispatch(
    createIncident(title, comment, incidentLocation, incidentType),
  ),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateIncident));
