const mockData = {
  loginUser: {
    success: {
      status: 200,
      data: [
        {
          token: 'x.y.z',
          user: {
            id: 1,
            email: 'admin@ireporter.com',
            username: 'admin',
            registeredOn: 'Fri, 28 Dec 2018 00:00:00 GMT'
          },
          success: 'Logged in successfully'
        }
      ]
    },

    failure: {
      error: 'Invalid credentials',
      status: 401
    }
  },
  registerUser: {
    success: {
      status: 201,
      data: [
        {
          user: {
            id: 'aefd1901-8e29-4699-a2bd-43163d699fc5',
            email: 'email@mail.com',
            username: 'kalsmic',
            registered: 'Sat, 22 Jun 2019 00:00:00 GMT'
          },
          success: 'Account created Successfully'
        }
      ]
    },
    failure: {
      status: 400,
      error: {
        username: 'Username must be string with atleast 5 characters and may contain a number',
        password: 'Password Must contain a Minimum 8 characters with atleast one upper case letter, atleast on lower case letter and  atleast one number.',
        email: 'Please provide a valid email address'
      }
    }
  }
};

export default mockData;
