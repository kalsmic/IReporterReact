import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser } from '../../store/actions/signUpActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import '../Login/Login.scss';


export class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();


    const {
      username,
      password,
      email,

    } = this.state;

    const { signUpUser } = this.props;


    if (
      username
      && email
      && password

    ) {
      signUpUser(
        username,
        email,
        password,
      );
    }
  };

  render() {
    const {
      username,
      password,
      email,
    } = this.state;
    const { isLoading, message, error } = this.props;
    const { password: passwordError, username: usernameError, email: emailError } = error;
    return (
      <div className="wrapper">
        <Header />
        <div className="wrapper__login_register border-round-lg">
          <h3 className="bd_line_bottom text-blue">Create an account !</h3>


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
              required
              className="wrapper__login_register__form__input"

            />
            {usernameError
            && <p data-test="usernameError" className="error-msg">{usernameError}</p>}

            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="EMAIL ADDRESS"
              required
              className="wrapper__login_register__form__input"

            />
            {emailError && <p data-test="emailError" className="error-msg">{emailError}</p>}


            <input
              type="password"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="PASSWORD"
              required
              className="wrapper__login_register__form__input"
            />
            {passwordError
            && <p data-test="passwordError" className="error-msg">{passwordError}</p>}
            <button
              type="submit"
              name="signup"
              className="wrapper__login_register__form__submit"
            >
              SIGNUP
              {' '}
              {isLoading && <i className="fa fa-spinner fa-spin" data-test="imageLoader" />}


            </button>
            {message && <p data-test="message">{message}</p>}

            <Link to="/"> Click Here to Login</Link>
          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

SignUp.propTypes = {
  signUpUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  error: PropTypes.shape({
    email: PropTypes.string,
    username: PropTypes.string,
    password: PropTypes.string,
  }).isRequired,
};


export const mapStateToProps = (state) => {
  const {
    signUpReducer: {
      isLoading, message, error,
    },
  } = state;
  return {
    isLoading,
    message,
    error,
  };
};

export const mapDispatchToProps = dispatch => ({
  signUpUser: (
    username,
    email,
    password,
  ) => dispatch(registerUser(
    username,
    email,
    password,
  )),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
