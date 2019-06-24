export const unauthenticatedResponse = {
  error: 'Please login in again or sign up an account to access this resource',
  status: 401,
};

export const incidentRecord = {
  id: '3ee21549-15fc-4a1b-b322-041356d7054d',
  title: 'Broken bridge.',
  comment: 'The floods have closed off access to the school',
  location: {
    lat: 12,
    lng: 14,
  },
  created_by: '935777cb-9b0e-414d-a104-04f94129347d',
  owner: 'mdavis',
  created_on: 'Sun, 23 Jun 2019 00:00:00 GMT',
  status: 'Draft',
  type: 'intervention',
  videos: [
    'video.mp4',
  ],
  images: [
    'image.jpg',
  ],
};

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
            registeredOn: 'Fri, 28 Dec 2018 00:00:00 GMT',
          },
          success: 'Logged in successfully',
        },
      ],
    },

    failure: {
      error: 'Invalid credentials',
      status: 401,
    },
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
            registered: 'Sat, 22 Jun 2019 00:00:00 GMT',
          },
          success: 'Account created Successfully',
        },
      ],
    },
    failure: {
      status: 400,
      error: {
        username: 'Username must be string with atleast 5 characters and may contain a number',
        password: 'Password Must contain a Minimum 8 characters with atleast one upper case letter, atleast on lower case letter and  atleast one number.',
        email: 'Please provide a valid email address',
      },
    },
  },
  createIncident: {
    success: {
      status: 201,
      data: [{
        incident: { ...incidentRecord },
        success: 'Created intervention record',
      }],
    },
    failure: {
      status: 400,
      error: {
        title: 'Field must contain a minimum of 4 characters',
        comment: 'Field must contain a minimum of 10 characters',
        location: 'location must be a list with both Latitude and Longitude coordinates',
        type: 'type must either be red-flag or intervention',
      },
    },
  },
  getIncident: {
    success: {
      status: 200,
      data: [
        { ...incidentRecord },
      ],
    },
    failure: {
      status: 404,
      error: 'red-flag record with specified id does not exist',

    },
  },
  getIncidents: {
    success: {
      status: 200,
      data: [
        { ...incidentRecord },
      ],
    },
    failure: { ...unauthenticatedResponse },
  },
};

export default mockData;
