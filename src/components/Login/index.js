import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../store/actions/loginActions';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import './Login.scss';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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

  renderLoginError= error => (
    error ? <div className="error-msg text-danger">{ error }</div> : ''
  );

  renderLoginSuccess= message => (message ? <div className="Success-msg text-danger">{message}</div> : '');

  render() {
    const { username, password } = this.state;
    const { error, message } = this.props;
    return (
      <div className="wrapper">
        <Header />
        <div className="wrapper__login_register">
          <h3>Login Here</h3>
          { this.renderLoginError(error) }
          { this.renderLoginSuccess(message) }

          <form
            onSubmit={this.handleSubmit}
            className="wrapper__login_register__form"
          >
            <input
              type="text"
              className="input_control"
              name="username"
              value={username}
              onChange={this.handleChange}
              placeholder="USERNAME"
            />

            <input
              type="password"
              className="input_control"
              name="password"
              value={password}
              onChange={this.handleChange}
              placeholder="PASSWORD"
            />
            <button
              type="submit"
              name="login"
            >
            Login
            </button>

          </form>
        </div>
        <Footer />
      </div>
    );
  }
}

Login.propTypes = {
  authenticateUser: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};
export const mapStateToProps = (state) => {
  const {
    loginReducer: {
      user, isLoggedIn, isLoading, message, error
    }
  } = state;
  return {
    user, isLoggedIn, isLoading, message, error
  };
};

export const mapDispatchToProps = dispatch => ({
  authenticateUser: (username, password) => dispatch(loginUser(username, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
