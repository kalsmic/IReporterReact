import { shallow } from 'enzyme';
import React from 'react';
import { SignUp, mapStateToProps, mapDispatchToProps } from './index';
import { findByTestAttr } from '../../../utils';

describe('Sign up Component', () => {
  const signUpUserFn = jest.fn();
  const props = {
    signUpUser: signUpUserFn,
    message: '',
    isLoading: false,
    error: {},

  };
  const newUserData = [
    ['username', 'kalsmic'],
    ['email', 'admin@eemail.com'],
    ['password', 'Pa$$word123'],
  ];
  const wrapper = shallow(<SignUp {...props} />);

  it('should render without crushing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle the onchange event', () => {
    const mockHandleChange = (name, value) => {
      const event = {
        target: {
          name,
          value,
        },
      };

      wrapper.instance().handleChange(event);
    };

    // eslint-disable-next-line array-callback-return
    newUserData.map(([name, value]) => {
      mockHandleChange(name, value);
      expect(wrapper.instance().state[name]).toBe(value);
    });
  });

  it('should handle the onSubmit event', () => {
    wrapper.setState({
      username: '',
      email: '',
      password: ''
    });
    const instance = wrapper.instance();
    const event = {
      target: {
        type: 'submit',
        name: 'login',
      },
      preventDefault: jest.fn()
    };
    instance.handleSubmit(event);
    expect(instance.state.username).toBe('');
    expect(instance.state.password).toBe('');
    expect(instance.props.signUpUser).not.toBeCalled();

    newUserData.map(([name, value]) => (
      wrapper.setState({
        [name]: value
      })
    ));
    instance.handleSubmit(event);

    expect(instance.props.signUpUser).toBeCalled();
  });

  it('should show messages to the user', () => {
    const error = {
      username: 'username Errors',
      email: 'email Error',
      password: 'password Error'
    };
    wrapper.setProps({
      error,
      isLoading: true,
      message: 'Success message'
    });
    expect(findByTestAttr(wrapper, 'usernameError').text()).toBe(error.username);
    expect(findByTestAttr(wrapper, 'emailError').text()).toBe(error.email);
    expect(findByTestAttr(wrapper, 'passwordError').text()).toBe(error.password);
    expect(findByTestAttr(wrapper, 'loader').exists()).toBe(true);
    expect(findByTestAttr(wrapper, 'message').text()).toBe('Success message');
  });


  it('should map state to props', () => {
    const mockedState = {
      signUpReducer: {
        message: 'Account created Successfully',
        isLoading: false,
        error: ''
      }
    };
    const state = mapStateToProps(mockedState);
    expect(state.message).toBe('Account created Successfully');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('');
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch).signUpUser();
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
