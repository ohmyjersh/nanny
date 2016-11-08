import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { AppContainer } from './container/App';
import RequireAuth from './components/auth/Authentication';
import Registration from './components/auth/registration';
import AccountManagement from './components/AccountManagement/AccountManagement';
import Invite from './components/AccountManagement/Invite';
import Users from './components/AccountManagement/Users';
import Profile from './components/Profile/Profile'
import Login from './components/auth/login';
import Actions from './actions/index';
import NannyDashboard from './components/Dashboard/NannyDashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
import cookie from 'react-cookie';

injectTapEventPlugin();

import reducers from './reducers';

// Add the reducer to your store on the `routing` key

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(
      thunkMiddleware,
      //loggerMiddleware
    )
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const token = cookie.load('token');
if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch(Actions.Auth.loginResponse({token:token}));
}


ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={AppContainer}>
      {/* Dashboard */}
        <Route title='NannyDashboard' path='nannydashboard' component={NannyDashboard} />
        {/* AccountManagement */}
        <Route title='AccountManagement' path='/account' component={RequireAuth(AccountManagement)} />
        <Route title='Invite' path='/account/invite' component={RequireAuth(Invite)} />
        <Route title='Users' path='/account/users' component={RequireAuth(Invite)} />
        {/* Profile */}
        <Route title='Profile' path='/profile' component={RequireAuth(Profile)} />
        {/* Auth */}
        <Route title='Registration' path='registration' component={Registration}/>
        <Route title='Login' path='login' component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
