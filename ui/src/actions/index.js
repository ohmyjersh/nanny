import * as ActionTypes from '../constants/actionTypes';

export function loadConfigurations(configurations) {
    return {
        type: ActionTypes.LOAD_CONFIGURATIONS,
        configurations
    }
}

export function loadManifests(manifests) {
    return {
        type: ActionTypes.LOAD_MANIFESTS,
        manifests
    }
}

export function setEditorContent(configEditor){
    return {
        type: ActionTypes.SET_EDITOR_CONTENT,
        configEditor
    }
}

export function setTransformerContent(transformerEditor){
    return {
        type: ActionTypes.SET_TRANSFORMER_CONTENT,
        transformerEditor
    }
}

export function registerRequest() {
  return {
  type: ActionTypes.REGISTER_REQUEST,
  }
}
export function registerResponse(response) {
  return {
    type: ActionTypes.REGISTER_RESPONSE,
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