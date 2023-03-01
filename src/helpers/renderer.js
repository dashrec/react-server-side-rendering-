import React from 'react';
import { renderToString } from 'react-dom/server'; //named export so we have to set curly breaks
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
import { Helmet } from 'react-helmet';

// current url location is sent from index file as req and it decides what to show on screen
export default (req, store, context) => {
  const content = renderToString(
    // rendering
    // render app on server side
    // StaticRouter passes context to any components it renders like notFoundPage
    // so we can receive context as a prop staticContext in components
    <Provider store={store}>
      <StaticRouter context={context} location={req.path}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  ); // turn react components in to html and send result back to client

  const helmet = Helmet.renderStatic();

  //  ${helmet.meta.toString()} will extract all meta tags like url type img
  return `
  <html>
  <head>
  ${helmet.title.toString()}
  ${helmet.meta.toString()}
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
  </head>
  <body>
    <div id="root">${content}</div>
    <script>
       window.INITIAL_STATE = ${serialize(store.getState())} 
    </script>
    <script src="bundle.js"></script>
  </body>  
  </html>  
  `;
};

// So you can kind of imagine that renderRoutes takes an array of route objects,
// turns them into normal route components and then returns those

// Serialized is a function that takes a string and will essentially escape any
// characters in there that are involved with setting up scripts like this <

// in short the script will no longer be executed inside of browser
// it replaces < with \u003C unicode
