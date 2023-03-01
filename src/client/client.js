// start up point for the client side application
import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducers from './reducers';
import 'babel-polyfill'; // to use async await babel needs some helpers to be executed
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
});
// if we use axiosInstance.get('/users) /api will be appended before like /api/users

const store = createStore(
  reducers,
  window.INITIAL_STATE,
  applyMiddleware(thunk.withExtraArgument(axiosInstance))
);

// BrowserRouter looks address bar in browser and accordingly decides which component to show on the screen
ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <div>{renderRoutes(Routes)}</div>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);

// So when we call react render, we are not replacing all the HTML inside there
// we are telling react to go back through and set up all those event handlers
// or all the necessary code that needs to be executed
// to kind of bind to that existing structure that's on the page.

// When this code is first executed on the browser side, there is already
// rendered content inside of that. Which is rendered on server side

// applyMiddleware is used to hook up any middleware that we might be using inside of our application.
// createStore function is used to make a redux store .
// thunk is to handle asynchronous action creators
// provider, which is what ties our store and the react side of our app together.
