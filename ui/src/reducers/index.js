import * as ActionTypes from '../constants/actionTypes';

function registerResponse(state, response) {
    return state;
}

function registeringRequest(state) {
    return state;
}

function setConfigContent(state, configEditor){
   return Object.assign({},state,{configEditor: configEditor});
}

function setTransformerContent(state, transformerEditor){
   return Object.assign({},state,{transformerEditor: transformerEditor});
}

function reducers (state = {
                configEditor: {editorState:null, rawContent:'',textContent:''},
                transformerEditor: {editorState:null, rawContent:'',textContent:''},
                loadedConfiguration: {},
                loadedManifest:{},
                configurations: [],
                manifests:[]

            }, action) {
            switch(action.type) {
                case ActionTypes.REGISTER_REQUEST:
                    return registeringRequest(state);
                case ActionTypes.REGISTER_RESPONSE:
                    return registerResponse(state, action.response);
                case ActionTypes.SET_EDITOR_CONTENT:
                    return setConfigContent(state,action.configEditor);
                case ActionTypes.SET_TRANSFORMER_CONTENT:
                    return setTransformerContent(state, action.transformerEditor);
                default:
                    return state;
    }
}

exports.module = reducers;