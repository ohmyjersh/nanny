import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { AppContainer } from './container/App';
import RequireAuth from './components/auth/Authentication';
import Registration from './components/auth/registration';
import Login from './components/auth/login';
import Settings from './components/Settings/Settings';
import Actions from './actions/index';
import NannyDashboard from './components/Dashboard/NannyDashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
import cookie from 'react-cookie';
import {store} from './store'

injectTapEventPlugin();

// For invite, create session token that has a one time use, grab that token from the query string and pass to registration page.
// cookie.save('from query string');
// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store)

const token = cookie.load('token');
if (token) {
  // Update application state. User has token and is probably authenticated
store.dispatch(Actions.Auth.loginResponse({token:token}));
  browserHistory.push('nannydashboard');
}


ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={AppContainer}>
      {/* Dashboard */}
        <Route title='NannyDashboard' path='nannydashboard' component={NannyDashboard} />
        {/* Auth */}
        <Route title='Registration' path='registration' component={Registration}/>
        <Route title='Login' path='login' component={Login}/>
        <Route title='Settings' path='settings' component={Settings}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
