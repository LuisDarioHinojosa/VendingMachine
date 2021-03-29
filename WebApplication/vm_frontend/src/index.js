import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'font-awesome/css/font-awesome.min.css';
import '@fortawesome/free-regular-svg-icons';
import '@fortawesome/free-brands-svg-icons';
import '@fortawesome/free-solid-svg-icons'
import '@fortawesome/fontawesome-svg-core';
import {BrowserRouter} from 'react-router-dom';

//import { faMapMarkedAlt, faPhoneAlt} from '@fortawesome/free-solid-svg-icons'

// Redux Middlewares
import {Provider} from 'react-redux';
import {configureStore} from './redux/configureStore';

const store = configureStore();


ReactDOM.render(
  <Provider store = {store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
