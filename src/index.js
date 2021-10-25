import React from 'react';
import ReactDOM from 'react-dom';
import Weather from './pages/Weather';
import { store } from './redux/store'
import { Provider } from 'react-redux'


import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Weather />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);