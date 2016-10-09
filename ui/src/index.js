import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import { AppContainer } from './container/App';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import Dashboard from './components/Dashboard/Dashboard';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import reducers from './reducers/index';

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

ReactDOM.render(
  <Provider store={store}>
    { /* Tell the Router to use our enhanced history */ }
    <Router history={history}>
      <Route path="/" component={AppContainer}>
        <Route title='Dashboard' path='dashboard' component={Dashboard}/>
        <Route title='Registration' path='registration' component={Registration}/>
        <Route title='Login' path='login' component={Login}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
