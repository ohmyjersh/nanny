import * as ActionTypes from '../constants/actionTypes';

function registerResponse(state, response) {
    return Object.assign({}, state, {
        token: response.token,
        isFetching:false
    });
}

function registeringRequest(state) {
    return Object.assign({}, state, {
        isFetching: true
    })
}

function loginResponse(state, response) {
    return Object.assign({}, state, {
        token: response.token,
        isFetching:false
    });
}

function loginRequest(state) {
    return Object.assign({}, state, {
        isFetching: true
    })
}

function setConfigContent(state, configEditor) {
    return Object.assign({}, state, { configEditor: configEditor });
}

function setTransformerContent(state, transformerEditor) {
    return Object.assign({}, state, { transformerEditor: transformerEditor });
}

function reducers(state = {
    configEditor: { editorState: null, rawContent: '', textContent: '' },
    transformerEditor: { editorState: null, rawContent: '', textContent: '' },
    loadedConfiguration: {},
    loadedManifest: {},
    configurations: [],
    manifests: [],
    isFetching: false,
    token: null
}, action) {
    switch (action.type) {
        case ActionTypes.REGISTER_REQUEST:
            return registeringRequest(state);
        case ActionTypes.REGISTER_RESPONSE:
            return registerResponse(state, action.response);
        case ActionTypes.LOGIN_REQUEST:
            return loginRequest(state);
        case ActionTypes.LOGIN_RESPONSE:
            return loginResponse(state, action.response);
        case ActionTypes.SET_EDITOR_CONTENT:
            return setConfigContent(state, action.configEditor);
        case ActionTypes.SET_TRANSFORMER_CONTENT:
            return setTransformerContent(state, action.transformerEditor);
        default:
            return state;
    }
}

exports.module = reducers;