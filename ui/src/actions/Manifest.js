import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function getManifestsReponse(manifests) {
    return {
        type: ActionTypes.LOAD_MANIFESTS,
        manifests
    }
}

export function createManifest(auth, manifest) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/manifest`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(manifest),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response);
                }
                return dispatch(getManifests(auth));
            })
    };
}

export function updateManifest(auth, manifest) {
    return dispatch => {
        //dispatch(loginRequest())
        return fetch(`${Config.API_HOST}/manifest/${manifest.id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(manifest),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log(response);
                }
                return dispatch(getManifests(auth));
            })
    };
}

export function getManifests(auth) {
    return dispatch => {
        //dispatch(registerRequest())
        return fetch(`${Config.API_HOST}/manifest`,
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
                dispatch(getManifestsReponse(json));
            })
    };
}

export function deleteManifest(auth, id) {
    console.log('delete');
    return dispatch => {
        //dispatch(loginRequest())
        return fetch(`${Config.API_HOST}/manifest/${id}`,
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
                }
                return dispatch(getManifests(auth));
            })
    };
}