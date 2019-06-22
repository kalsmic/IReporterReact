export const findByTestAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const baseURL = 'https://ireporterv3.herokuapp.com/api/v3';

export const isAuthenticated = () => {
  const token = sessionStorage.getItem('iReporterToken');
  if (token) { return true; }
  return false;
};
