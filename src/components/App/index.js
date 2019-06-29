import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from '../Login';
import SignUp from '../SignUp';
import CreateIncident from '../CreateIncident';
import ViewIncident from '../ViewIncident';

import '../../assets/Main.scss';
import { isAuthenticated } from '../../../utils';
import GetIncidents from '../GetIncidents';


class IReporterApp extends Component {
  render() {
    const AuthenticatedRoute = (
      {
        component: ProtectedComponent,
        ...extraProps
      },
    ) => (

      <Route
        {...extraProps}
        render={props => (isAuthenticated() ? (
          <ProtectedComponent {...props} />
        ) : (
          <Redirect to="/" />
        ))
        }
      />
    );
    const OnlyNoneAuthenticatedRoute = (
      {
        component: ProtectedComponent,
        ...extraProps
      },
    ) => (

      <Route
        {...extraProps}
        render={props => (isAuthenticated() ? (
          <Redirect to="/createIncident" />

        ) : (
          <ProtectedComponent {...props} />

        ))
        }
      />
    );
    const superHistory = 'pushState' in window.history;
    return (
      <Router forceRefresh={superHistory}>
        <Switch>

          <OnlyNoneAuthenticatedRoute path="/" exact strict component={Login} />
          <OnlyNoneAuthenticatedRoute path="/signup" exact strict component={SignUp} />

          <AuthenticatedRoute
            path="/createIncident"
            exact
            strict
            component={CreateIncident}
          />
          <AuthenticatedRoute
            path="/:incidentType"
            exact
            strict
            component={GetIncidents}
          />
          <AuthenticatedRoute
            path="/:incidentType/:incidentUUID"
            exact
            strict
            component={ViewIncident}
          />
        </Switch>
      </Router>

    );
  }
}


export default IReporterApp;
