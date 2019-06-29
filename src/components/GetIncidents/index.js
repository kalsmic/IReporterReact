// Main library
import React, { Component } from 'react';

// Third-party libraries
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import renderHTML from 'react-render-html';
import PropTypes from 'prop-types';

// components
import Root from '../Common/Root';

// Actions
import { getIncidents } from '../../store/actions/incidentActions';

// styles
import './style.scss';


export class GetIncidents extends Component {
  componentDidMount() {
    const { viewIncidents, match: { params: { incidentType } } } = this.props;
    viewIncidents(incidentType);
  }

  render() {
    const { isLoading, incidents } = this.props;


    const incidentsRecords = incidents.map(incident => (
      <li className="incidents__item" key={incident.id}>
        <h2 className="incidents__item__title">{incident.title}</h2>
        <div className="incidents__item__body">
          {renderHTML(incident.comment)}
        </div>
        <div className="incidents__item__footer">
          <Link to={`/${incident.type}/${incident.id}`}>View details!</Link>
        </div>
      </li>
    ));


    return (
      <Root>
        <h3 className="text-blue bd_line_bottom">Incidents</h3>
        {isLoading && (
          <div><i className="fa fa-3x fa-spinner fa-spin" data-test="imageLoader" /></div>)}

        <ul className="incidents">


          {incidentsRecords}
        </ul>

      </Root>
    );
  }
}

GetIncidents.propTypes = {
  viewIncidents: PropTypes.func.isRequired,
  incidents: PropTypes.arrayOf(
    PropTypes.shape({
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
    })
  ).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      incidentType: PropTypes.string.isRequired,
    }),
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,

};
export const mapStateToProps = (state) => {
  const { incidentReducer: { incidents, isLoading } } = state;
  return {
    incidents,
    isLoading
  };
};

export const mapDispatchToProps = dispatch => ({

  viewIncidents: incidentType => dispatch(
    getIncidents(incidentType),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(GetIncidents);
