import { shallow } from 'enzyme';
import React from 'react';
import { Login, mapDispatchToProps, mapStateToProps } from './index';

describe('Login Component', () => {
  const authenticateUserFn = jest.fn();
  const props = {
    authenticateUser: authenticateUserFn,
    error: '',
    message: '',
  };
  const wrapper = shallow(<Login {...props} />);

  it('should render without crushing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handle the onchange event', () => {
    const event = {
      target: {
        name: 'username',
        value: 'kalsmic',
      },
    };

    wrapper.instance().handleChange(event);
    expect(wrapper.instance().state.username).toBe('kalsmic');
  });

  it('should handle the onSubmit event', () => {
    const instance = wrapper.instance();
    wrapper.setState({ username: '', password: '' });
    const event = {
      target: {
        type: 'submit',
        name: 'login',
      },
      preventDefault: jest.fn(),
    };

    instance.handleSubmit(event);
    expect(wrapper.instance().state.username).toBe('');
    expect(wrapper.instance().state.password).toBe('');
    expect(instance.props.authenticateUser).not.toBeCalled();

    wrapper.setState({ username: 'admin', password: 'Pa4$word123' });
    expect(wrapper.find('input[type="text"]').props().value).toBe('admin');
    expect(wrapper.find('input[type="password"]').props().value).toBe('Pa4$word123');
    instance.handleSubmit(event);

    expect(instance.props.authenticateUser).toBeCalled();
  });

  it('should show messages to the user', () => {
    wrapper.setProps({ error: 'Invalid credentials' });
    wrapper.setState({ isSubmitted: true });
    expect(wrapper.find('.error-msg').text()).toBe('Invalid credentials');
    wrapper.setProps({
      error: '',
      message: 'login successful',
    });
    expect(wrapper.find('.success-msg').text()).toBe('login successful');
  });


  it('should map state to props', () => {
    const mockedState = {
      loginReducer: {
        message: 'logged in Successfully',
        isLoggedIn: true,
        isLoading: false,
        error: '',
      },
    };
    const state = mapStateToProps(mockedState);
    expect(state.message).toBe('logged in Successfully');
    expect(state.isLoggedIn).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('');
  });

  it('should map dispatch to props', () => {
    const mockedDispatch = jest.fn();

    mapDispatchToProps(mockedDispatch).authenticateUser();
    expect(mockedDispatch).toHaveBeenCalled();
  });
});
