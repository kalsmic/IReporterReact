import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from '../Login';
import SignUp from '../SignUp';
import CreateIncident from '../CreateIncident';

import Root from '../Common/Root';
import '../../assets/Main.scss';
import { isAuthenticated } from '../../../utils';


class IReporterApp extends Component {
  render() {
    const ViewIncident = () => (<Root><h1>View incidents page</h1></Root>);
    const AuthenticatedRoute = (
      {
        component: ProtectedComponent,
        ...extraProps
      }
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
      }
    ) => (

      <Route
        {...extraProps}
        render={props => (isAuthenticated() ? (
          <Redirect to="/viewIncident" />

        ) : (
          <ProtectedComponent {...props} />

        ))
        }
      />
    );

    return (
      <Router>
        <Switch>

          <OnlyNoneAuthenticatedRoute path="/" exact strict component={Login} />
          <OnlyNoneAuthenticatedRoute path="/signup" exact strict component={SignUp} />

          <AuthenticatedRoute
            path="/createIncident"
            exact
            strict
            component={CreateIncident}
          />
          <AuthenticatedRoute path="/viewIncident" exact strict component={ViewIncident} />
        </Switch>
      </Router>

    );
  }
}


export default IReporterApp;
