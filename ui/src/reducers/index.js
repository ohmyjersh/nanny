import * as ActionTypes from '../constants/actionTypes'

function registerResponse (state, response) {
  return Object.assign({}, state, {
    auth: { token: response.token, authenticated: true },
    isFetching: false
  })
}
function registeringRequest (state) {
  return Object.assign({}, state, {
    isFetching: true
  })
}
function loginResponse (state, response) {
  return Object.assign({}, state, {
    auth: { token: response.token, authenticated: true },
    isFetching: false
  })
}
function loginRequest (state) {
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
      isValid: configEditor.isValid
  }})
}
function setTransformerContent (state, transformerEditor) {
  return Object.assign({}, state, { transformerEditor: transformerEditor })
}

function setTitle (state, title) {
  return Object.assign({}, state, { configEditor: {
      rawContent: state.configEditor.rawContent,
      textContent: state.configEditor.textContent,
      editorState: state.configEditor.editorState,
      title: title,
      currentSelection: state.configEditor.currentSelection,
      isValid: state.configEditor.isValid
  }})
}

function loadConfigurations (state, configurations) {
  let mapConfigurations = configurations.map(configuration => {
    return {
      id: configuration._id,
      title: configuration.title,
      configuration: configuration.configuration,
      raw: configuration.raw
    }
  })
  return Object.assign({}, state, {
    configurations: mapConfigurations
  })
}

function loadManifests (state, manifests) {
  let mapManifests = manifests.map(manifest => {
    return {
      id: manifest.id,
      title: manifest.title,
      manifest: manifest.manifest,
      raw: manifest.raw
    }
  })
  return Object.assign({}, state, {
    manifests: mapManifests
  })
}

function loadSelection(state, selection ) {
  var configuration = state.configurations[selection];
  return Object.assign({}, state, { configEditor: {
      rawContent: configuration.raw,
      textContent: configuration.configuration,
      editorState: state.configEditor.editorState,
      title: configuration.title,
      currentSelection: selection,
      isValid:false
  }});
}

function reducers (state = {
    configEditor: { editorState: null, rawContent: '', textContent: '', isValid:false, currentSelection: -1, title: ''},
    transformerEditor: { editorState: null, rawContent: '', textContent: '' },
    configurations: [],
    manifests: [],
    isFetching: false,
    auth: { token: null, authenticated: false }
  } , action) {
  switch (action.type) {
    case ActionTypes.REGISTER_REQUEST:
      return registeringRequest(state)
    case ActionTypes.REGISTER_RESPONSE:
      return registerResponse(state, action.response)
    case ActionTypes.LOGIN_REQUEST:
      return loginRequest(state)
    case ActionTypes.LOGIN_RESPONSE:
      return loginResponse(state, action.response)
    case ActionTypes.SET_EDITOR_CONTENT:
      return setConfigContent(state, action.configEditor)
    case ActionTypes.SET_TRANSFORMER_CONTENT:
      return setTransformerContent(state, action.transformerEditor)
    case ActionTypes.LOAD_CONFIGURATIONS:
      return loadConfigurations(state, action.configurations)
    case ActionTypes.SET_TITLE:
      return setTitle(state, action.title)
    case ActionTypes.LOAD_SELECTION:
      return loadSelection(state, action.selection);
    default:
      return state
  }
}
exports.module = reducers
