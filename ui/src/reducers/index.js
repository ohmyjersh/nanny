function registerResponse(state, response) {
    return state;
}

function registeringRequest(state) {
    return state;
}

function setConfigContent(state, configEditor){
   return Object.assign({},state,{configEditor: configEditor});
}

function setTransformerContent(state, rawTransformer){
   return Object.assign({},state,{rawTransformer: rawTransformer});
}

function reducers (state = {rawContent:'', rawTransformer:''}, action) {
    switch(action.type) {
        case "REGISTER_REQUEST":
            return registeringRequest(state);
        case "REGISTER_RESPONSE":
            return registerResponse(state, action.response);
        case "SET_EDITOR_CONTENT":
            return setConfigContent(state,action.configEditor);
        case "SET_TRANSFORMER_CONTENT":
            return setTransformerContent(state, action.rawTransformer);
        default:
            return state;
    }
}

exports.module = reducers;