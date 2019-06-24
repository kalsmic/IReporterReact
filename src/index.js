import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import IReporterApp from './components/App';
import { store } from './store';
import { history } from '../utils';


ReactDOM.render(
  <Provider store={store} history={history}>
    <IReporterApp />
  </Provider>,
  document.getElementById('root'),
);
