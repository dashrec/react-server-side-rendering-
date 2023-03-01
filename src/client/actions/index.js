export const FETCH_USERS = 'fetch_user';

// this function gets automatically invoked by Redux Thunk when redux thunk
// calls this function, it's now going to pass in three separate arguments.
// axiosInstance rename to api
export const fetchUsers = () => async (dispatch, getState, api) => {
  // So whenever we make this request, the axiosInstance is going to prepend an api.
  // The proxy running on our render server will take that request, send it on to the
  // API heroku-app.com and then respond with whatever that API sends back.

  const res = await api.get('/users');

  dispatch({
    // call reducer
    type: FETCH_USERS,
    payload: res,
  });
};

export const FETCH_CURRENT_USER = 'fetch_current_user';

export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  const res = await api.get('/current_user');

  dispatch({
    // call reducer
    type: FETCH_CURRENT_USER,
    payload: res,
  });
};


export const FETCH_ADMINS = 'fetch_admins';


export const fetchAdmins = () => async (dispatch, getState, api) => {
  const res = await api.get('/admins');

  dispatch({
    // call reducer
    type: FETCH_ADMINS,
    payload: res,
  });
};
