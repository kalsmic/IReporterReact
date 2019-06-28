import React, { Component } from 'react';
import '../../assets/Main.scss';
import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import Login from '../Login';
import Root from '../Common/Root';

class IReporterApp extends Component {
  state = {
    isLoggedIn: false,
  };

  render() {
    const Home = () => (<Root><h1>Welcome home</h1></Root>);
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
          <Redirect to="/login" />
        ))
        }
      />
    );

    return (
      <Router>
        <Switch>

          <Route path="/" exact strict component={Home} />
          <Route path="/login" exact strict component={Login} />

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
