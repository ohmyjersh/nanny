import * as ActionTypes from '../constants/actionTypes'
import profile from './profile';
import auth from './auth'
import nannyEditor from './nannyEditor';
import manifests from './manifests';
import configurations from './configurations';
import { combineReducers } from 'redux'

function registerResponse (state, response) {
  return Object.assign({}, state.auth, {
    auth: { token: response.token, authenticated: true },
    isFetching: false
  })
}
function registeringRequest (state) {
  return Object.assign({}, state, {
    isFetching: true
  })
}

function setTransformerContent (state, transformerEditor) {
  return Object.assign({}, state, { transformerEditor: transformerEditor })
}

function setError(state, error) {
  return Object.assign({}, state, {error:{message:error.message, open:error.open}});
}

function reducer (state = {
    transformerEditor: { editorState: null, rawContent: '', textContent: '' },
    isFetching: false,
    auth: { token: '', authenticated: false },
    error: { message:'', open:false }
  } , action) {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
      return registeringRequest(state)
    case ActionTypes.REGISTER_RESPONSE:
      return registerResponse(state, action.response)
    case ActionTypes.SET_TRANSFORMER_CONTENT:
      return setTransformerContent(state, action.transformerEditor)
    case ActionTypes.SET_ERROR:
      return setError(state, action.error);
    default:
      return state
  }
}

exports.module = combineReducers({
  reducer,
  profile,
  nannyEditor,
  manifests,
  auth,
  configurations
});