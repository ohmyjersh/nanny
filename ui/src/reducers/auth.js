import * as ActionTypes from '../constants/actionTypes'

function logout(state) {
  return Object.assign({}, state, {token: '', authenticated: false });
}

function login (state, response) {
  return Object.assign({}, state, { token: response.token, authenticated: true });
}

export default function(state = {}, action) {
    switch(action.type){
    case ActionTypes.LOGOUT:
      return logout(state);
    case ActionTypes.LOGIN:
      return login(state, action.response);
    default: 
        return state;
    }
}