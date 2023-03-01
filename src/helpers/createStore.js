import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import axios from 'axios';
// initial req from server 
// receive req from index file sent from createStore(req);
export default (req) => {
  const axiosInstance = axios.create({
    baseURL: 'http://react-ssr-api.herokuapp.com',
    headers: { cookie: req.get('cookie') || '' }, // if no cookie set empty str
  });

  const store = createStore(
    reducers,
    {},
    applyMiddleware(thunk.withExtraArgument(axiosInstance))
  );
  return store;
};

// the initial page load request phase, we attempt to make requests to the API 
// directly without proxy because they are coming from the server on behalf
// of browser