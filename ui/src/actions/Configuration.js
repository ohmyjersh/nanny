import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function getConfigurationsReponse(configurations) {
    return {
        type: ActionTypes.LOAD_CONFIGURATIONS,
        configurations
    }
}

export function createConfiguration(auth, configuration) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/configuration`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(configuration),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response);
                }
                return dispatch(getConfigurations(auth));
            })
    };
}

export function updateConfiguration(auth, configuration) {
    return dispatch => {
        //dispatch(loginRequest())
        return fetch(`${Config.API_HOST}/configuration`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(configuration),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response);
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                //dispatch(loginResponse(json));
                //window.location.href = 'http://localhost:3000/dashboard';
            })
    };
}

export function getConfigurations(auth) {
    return dispatch => {
        //dispatch(registerRequest())
        return fetch(`${Config.API_HOST}/configuration`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log("error");
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                dispatch(getConfigurationsReponse(json));
            })
    };
}

export function deleteConfiguration(auth, configuration) {
    return dispatch => {
        //dispatch(loginRequest())
        return fetch(`${Config.API_HOST}/configuration/${configuration.id}`,
            {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response);
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                //cookie.save('token', json.token, { path: '/' });
                //dispatch(loginResponse(json));
                //window.location.href = 'http://localhost:3000/dashboard';
            })
    };
}