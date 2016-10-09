function registerResponse(state, response) {
    console.log(response);
    return state;
}

function registeringRequest(state) {
    console.log('registering');
    return state;
}

function setConfigContent(state, rawContent){
   return Object.assign({},state,{rawContent: rawContent});
}

function setTransformerContent(state, rawTransformer){
   return Object.assign({},state,{rawTransformer: rawTransformer});
}

function reducers (state = {rawContent:{},rawTransformer:''}, action) {
    switch(action.type) {
        case "REGISTER_REQUEST":
            return registeringRequest(state);
        case "REGISTER_RESPONSE":
            return registerResponse(state, action.response);
        case "SET_EDITOR_CONTENT":
            return setConfigContent(state,action.rawContent);
        case "SET_TRANSFORMER_CONTENT":
            return setTransformerContent(state, action.rawTransformer);
        default:
            return state;
    }
}

exports.module = reducers;