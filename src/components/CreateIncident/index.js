import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { createIncident } from '../../store/actions/incidentActions';

import IncidentMap from '../Map';

import './CreateIncident.scss';
import Root from '../Common/Root';
import img from '../../img/loader.gif';

export class CreateIncident extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      title: 'my first tile',
      comment: 'hahahahaha',
      incidentLocation: [],
      latlng: {
        lat: 51.505,
        lng: -0.09,
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


  render() {
    const {
      title, comment, incidentType, latlng, hasLocation,
    } = this.state;
    const {
      isLoading, message, error,
    } = this.props;
    const {
      title: titleError, comment: commentError, location: locationError,
    } = error;


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
          <textarea
            className="incident__form__input"

            placeholder="What happened ?"
            maxLength="800"
            onChange={this.handleChange}
            value={comment}
            name="comment"
            required
          />

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
              {message && (message) }
            </div>
            <button
              type="submit"
              className="btn bg-green text-white "
            >
            Add Incident Record
              {' '}
              {isLoading && <img src={img} alt="loader" data-test="imageLoader" />
              }

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

};

export const mapStateToProps = (state) => {
  const {
    incidentReducer: {
      incident, isLoading, message, error,
    },
  } = state;
  return {
    incident, isLoading, message, error,
  };
};

export const mapDispatchToProps = dispatch => ({

  newIncident: (
    title, comment, incidentLocation, incidentType,
  ) => dispatch(
    createIncident(title, comment, incidentLocation, incidentType),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateIncident);