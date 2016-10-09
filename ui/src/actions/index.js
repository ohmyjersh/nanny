export function setEditorContent(rawContent){
    return {
        type: "SET_EDITOR_CONTENT",
        rawContent
    }
}

export function setTransformerContent(rawTransformer){
    return {
        type: "SET_TRANSFORMER_CONTENT",
        rawTransformer
    }
}

export function registerRequest() {
  return {
  type: 'REGISTER_REQUEST'
  }
}
export function registerResponse(response) {
  return {
    type:'REGISTER_RESPONSE',
    response: response
  }
}

export function register(register) {
    return dispatch =>  {
        dispatch(registerRequest())
        return fetch('localhost:3003/api/configuration/generator',
              { method: 'GET',
               mode: 'cors',
               body: {
                    "username":register.email,
                    "password":register.password
                },
               cache: 'default' }).then(response => {
            if(response.status !== 200)
            { 
                console.log(response);
                //dispatch(setError("error"));
            }
            console.log(response);
                return response.json();
            })
        .then((json) => {
            dispatch(registerResponse(json));
        })
    };
}