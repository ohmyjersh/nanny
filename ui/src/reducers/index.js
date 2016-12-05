import { combineReducers } from 'redux'
import * as ActionTypes from '../constants/actionTypes'
import profile from './profile';
import auth from './auth'
import nannyEditor from './nannyEditor';
import manifests from './manifests';
import configurations from './configurations';
import users from './users';
import apiKeys from './apiKeys';

function beginFetching (state) {
  return Object.assign({}, state, {
    isFetching: true
  })
}

function doneFetching(state) {
  return Object.assign({}, state, {
    isFetching: false
  });
}

function errorFetching(state, error) {
  return Object.assign({}, state, {isFetching:false }, {error:{message:error.message, open:error.open}});
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
    error: { message:'', open:false}
  } , action) {
  switch (action.type) {
    case ActionTypes.BEGIN_FETCHING:
      return beginFetching(state);
    case ActionTypes.DONE_FETCHING:
      return doneFetching(state);
    case ActionTypes.ERROR_FETCHING:
      return errorFetching(state, action.error);
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
  configurations,
  users,
  apiKeys
});