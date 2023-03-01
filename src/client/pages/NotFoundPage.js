import React from 'react';

// we need to default value as an empty object because browser has not idea about staticContext

const NotFoundPage = ({ staticContext = {} }) => {
  staticContext.notFound = true;

  return <h1>Opps, route not found.</h1>;
};

export default {
  component: NotFoundPage,
};
