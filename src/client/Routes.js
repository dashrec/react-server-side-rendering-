import React from 'react';
import HomePage from './pages/HomePage';
import UsersListPage from './pages/UsersListPage';
import App from './App';
import NotFoundPage from './pages/NotFoundPage';
import AdminsListPage from './pages/AdminsListPage';

//if we want to use react router config library we need to use that kind of code
export default [
  {
    ...App, // always display on the screen and wrap is to children
    routes: [
      {
        ...HomePage,
        path: '/',
        exact: true,
      },
      
      {
        ...AdminsListPage,
        path: '/admins',
      },    

      {
        ...UsersListPage,
        path: '/users',
      },

    

      {
        ...NotFoundPage
      }
    ],
  },
];

// Remember, the entire purpose of router config library is that we are
// making sure that we can figure out what set of components are about to
// be rendered given some particular URL.
