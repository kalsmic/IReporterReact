const mockData = {
  loginUser: {
    success: {
      status: 200,
      data: [
        {
          token: 'x.y.z',
          user: {
            id: 1,
            firstname: 'Administrator',
            lastname: 'admin',
            othernames: '',
            email: 'admin@ireporter.com',
            phoneNumber: '07731235678',
            username: 'admin',
            registeredOn: 'Fri, 28 Dec 2018 00:00:00 GMT'
          },
          message: 'Logged in successfully'
        }
      ]
    },

    failure: {
      error: 'Invalid credentials',
      status: 401
    }
  }
};

export default mockData;
