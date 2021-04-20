import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datetime/css/react-datetime.css";
import 'react-toastify/dist/ReactToastify.css'; 
import {Provider} from "react-redux";
import { eventReducer } from './redux/reducer';
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from 'redux';

import './index.css';
import App from './App';

const store = createStore(eventReducer,applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

