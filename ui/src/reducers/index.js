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

function setConfigContent (state, configEditor) {
  return Object.assign({}, state, { configEditor: {
      rawContent: configEditor.rawContent,
      textContent: configEditor.textContent,
      editorState: configEditor.editorState,
      title: state.configEditor.title,
      currentSelection: state.configEditor.currentSelection,
      isValid: configEditor.isValid,
      id: configEditor.id
  }})
}
function setTransformerContent (state, transformerEditor) {
  return Object.assign({}, state, { transformerEditor: transformerEditor })
}
function loadSelection(state, selection ) {
  var configuration = state.configurations[selection];
  return Object.assign({}, state, { configEditor: {
      rawContent: configuration.raw,
      textContent: configuration.configuration,
      editorState: state.configEditor.editorState,
      title: configuration.title,
      currentSelection: selection,
      isValid:false,
      id: configuration.id
  }});
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
    case ActionTypes.SET_EDITOR_CONTENT:
      return setConfigContent(state, action.configEditor)
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