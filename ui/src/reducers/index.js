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

function startState(){
    return  {
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: '{\n}'
        }
      ]
    }
}

function reducers (state = {
                configEditor: {rawContent:'',textContent:''},
                transformerEditor: {rawContent:'',textContent:''}
            }, action) {
            switch(action.type) {
                case "REGISTER_REQUEST":
                    return registeringRequest(state);
                case "REGISTER_RESPONSE":
                    return registerResponse(state, action.response);
                case "SET_EDITOR_CONTENT":
                    return setConfigContent(state,action.configEditor);
                case "SET_TRANSFORMER_CONTENT":
                    return setTransformerContent(state, action.transformerEditor);
                default:
                    return state;
    }
}

exports.module = reducers;