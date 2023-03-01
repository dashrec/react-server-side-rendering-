/* const express = require('express');
const React = require('react');
const renderToString = require('react-dom/server').renderToString; 
const Home = require('./client/components/Home').default;  */
import createStore from './helpers/createStore';
import express from 'express';
import renderer from './helpers/renderer';
import 'babel-polyfill'; // to use async await babel needs some helpers to be executed
import { matchRoutes } from 'react-router-config';
import Routes from './client/Routes';
import proxy from 'express-http-proxy';

const app = express();

// So now any request starts with api tries to access a route of API will be
// automatically sent off to this domain.
app.use(
  // second req phase uses proxy
  '/api',
  proxy('http://react-ssr-api.herokuapp.com', {
    proxyReqOptDecorator(opts) {
      opts.headers['x-forwarded-host'] = 'localhost:3000';
      return opts;
    },
  })
);

app.use(express.static('public'));

// Remember, this req object has a tremendous amount of data.
// And it also includes within it all the cookies that were sent from the
// user's browser to this route handler or to our render server.
// So we're going to take this request object. We're going to pass it into the create store function.

app.get('*', (req, res) => {
  const store = createStore(req);
  // matchRoutes is going to look at whatever route the user is trying to visit,
  // and then it's going to return an array of components that are about to be rendered.
  // loadData(store) is about loadData func to have ref to serverSide redux store
  const promises = matchRoutes(Routes, req.path)
    .map(({ route }) => {
      return route.loadData ? route.loadData(store) : null; // get func defined in userList component passed to router and finally end up here
    })
    .map((promise) => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};
    const content = renderer(req, store, context);

    if (context.url) {
      return res.redirect(301, context.url);
    }

    if (context.notFound) {
      res.status(404);
    }

    res.send(content); // render app after all promises are resolved
  });
  // console.log(promises);
  // When this promise is resolved(pending), means that the network request to our
  // API must be completed and we are ready to actually render our application.
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

//So because our server files are being handled by Webpack, we can now make use of es twenty fifteen modules on our server side code as well that is usually not supported by node.js
//And we want to do that specifically to kind of lessen the distinction between our server side code and client side code.
//isomorphic
//common js module system is characterized by require statements while es2025 is using import statement

//if we want to write jsx on Server, we need to run webpack and babel on our server side code just as we would on client side

// we don't want to have to do a big context shift, so to speak, as we start working on our React code versus express code, we want to be able to write the exact same dialect of JavaScript on both sides.
