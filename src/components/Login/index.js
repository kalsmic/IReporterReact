import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { loginUser } from '../../store/actions/loginActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import './Login.scss';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();


    const { username, password } = this.state;
    const { authenticateUser } = this.props;

    if (username && password) {
      authenticateUser(username, password);
    }
  };

  renderLoginError = error => (
    error ? <div className="error-msg text-danger">{error}</div> : ''
  );

  renderLoginSuccess = message => (message ? <div className="success-msg text-danger">{message}</div> : '');

  render() {
    const { username, password } = this.state;
    const {
      error, message, isLoggedIn, history,
    } = this.props;

    if (isLoggedIn) {
      setTimeout(() => {
        history.push('/viewIncident');
      }, 1000);
    }
    return (
      <div className="wrapper">
        <Header />
        <div className="wrapper__login_register border-round-lg">
          <h3>Login Here !</h3>
          {this.renderLoginError(error)}
          {this.renderLoginSuccess(message)}

          <form
            onSubmit={this.handleSubmit}
            className="wrapper__login_register__form"
          >
            <input
              type="text"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="USERNAME"
              className="wrapper__login_register__form__input"

            />

            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="PASSWORD"
              className="wrapper__login_register__form__input"

            />
            <button
              type="submit"
              name="login"
              className="wrapper__login_register__form__submit"
            >
              Login
            </button>
            <Link to="/signup"> Create an account</Link>

          </form>
        </div>
        <Footer />
      </div>
    );
  }
}
Login.defaultProps = {
  history: () => {},
};

Login.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  authenticateUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  history: PropTypes.func,
};

export const mapStateToProps = (state) => {
  const {
    loginReducer: {
      user, isLoggedIn, isLoading, message, error,
    },
  } = state;
  return {
    user, isLoggedIn, isLoading, message, error,
  };
};

export const mapDispatchToProps = dispatch => ({
  authenticateUser: (username, password) => dispatch(loginUser(username, password)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
