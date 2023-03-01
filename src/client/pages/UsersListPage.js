import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions';
import { Helmet } from 'react-helmet';

class UsersListPage extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers() {
    return this.props.users.map((user) => {
      return <li key={user.id}>{user.name}</li>;
    });
  }

  head() {
    return (
      <Helmet>
        <title>{`${this.props.users.length} Users Loaded`}</title>
        <meta property="og:title" content="User App" />
      </Helmet>
    );
  }
  render() {
    return (
      <div>
        {this.head()}
        Here is a big list of users:
        <ul>{this.renderUsers()}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

// get store from serverSide redux Store define in index file
function loadData(store) {
  //because we can not use connect tag we re instead working with Dispatch manually.
  return store.dispatch(fetchUsers()); //set return to get back this req in index file
}

//export { loadData }; // named export

export default {
  loadData,
  component: connect(mapStateToProps, { fetchUsers })(UsersListPage),
};

// Well, remember that the Connect function works in a normal application by
// communicating with the provider tag, which is usually placed at the top level of the app.
// The provider tag has a reference to the Redux store.
// connect only works through communication with the provider.
// in our situation, we have decided that we need to use Redux and do all this
// data loading stuff before rendering our application at all.
