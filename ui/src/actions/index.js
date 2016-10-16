import * as ActionTypes from '../constants/actionTypes';
import cookie from 'react-cookie';

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

export function setEditorContent(configEditor) {
    return {
        type: ActionTypes.SET_EDITOR_CONTENT,
        configEditor
    }
}

export function setTransformerContent(transformerEditor) {
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

export function loginRequest() {
    return {
        type: ActionTypes.LOGIN_REQUEST,
    }
}
export function loginResponse(response) {
    return {
        type: ActionTypes.LOGIN_RESPONSE,
        response: response
    }
}

export function register(register) {
    console.log(register);
    return dispatch => {
        dispatch(registerRequest())
        return fetch('http://localhost:3003/api/authentication/register',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    username: register.username,
                    password: register.password
                }),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log("error");
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                cookie.save('token', json.token, { path: '/' });
                dispatch(registerResponse(json));
            })
    };
}

export function login(login) {
    return dispatch => {
        dispatch(loginRequest())
        return fetch('http://localhost:3003/api/authentication/login',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    username: login.username,
                    password: login.password
                }),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response);
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                cookie.save('token', json.token, { path: '/' });
                dispatch(loginResponse(json));
                //window.location.href = 'http://localhost:3000/dashboard';
            })
    };
}