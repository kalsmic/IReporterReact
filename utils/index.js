import createHistory from 'history/createBrowserHistory';

export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const baseURL = 'https://ireporterv3.herokuapp.com/api/v3';
const token = sessionStorage.getItem('iReporterToken');

export const isAuthenticated = () => {
  if (token) { return true; }
  return false;
};

export const authorizationHeader = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  },
};


export const history = createHistory();
