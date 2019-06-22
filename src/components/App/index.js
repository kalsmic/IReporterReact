import React, { Component } from 'react';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from '../Login';
import Root from '../Common/Root';
import '../../assets/Main.scss';


class IReporterApp extends Component {
  state = {
    isLoggedIn: false,
  };

  render() {
    const CreateIncident = () => (<Root><h1>Create Incident Page</h1></Root>);
    const ViewIncident = () => (<Root><h1>View incidents page</h1></Root>);
    const { isLoggedIn } = this.state;
    const AuthenticatedRoute = (
      {
        component: ProtectedComponent,
        ...extraProps
      }
    ) => (

      <Route
        {...extraProps}
        render={props => (isLoggedIn ? (
          <ProtectedComponent {...props} />
        ) : (
          <Redirect to="/" />
        ))
        }
      />
    );

    return (
      <Router>
        <Switch>

          <Route path="/" exact strict component={Login} />

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
