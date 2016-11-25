import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function GenereateApiKeyRequest() {
    return { 
        type:GENEREATE_APIKEY_REQUEST
    }
}

export function GenereateApiKeyResponse() {
    return { 
        type:GET_APIKEY_RESPONSE
    }
}

export function GetApiKeysRequest() {
    return { 
        type:GET_APIKEY_REQUEST }
}

export function GetApiKeysResponse() {
    return { 
        type:GET_APIKEY_RESPONSE }
}

export function GetUserApiKeysRequest() {
    return { 
        type:GET_USER_APIKEY_REQUEST }
}

export function GetUserApiKeysResponse() {
    return { 
        type:GET_USER_APIKEY_RESPONSE }
}

export function DeleteApiKeyRequest() {
    return { 
        type:DELETE_APIKEY_REQUEST  }
}

export function DeleteApiKeyResponse() {
    return { 
        type:DELETE_APIKEY_REPSONSE }
}

export function PutApiKeyRequest() {
    return { 
        type:PUT_APIKEY_REQUEST }
}

export function PutApiKeyResponse() {
    return {
        type:PUT_APIKEY_REPSONSE
    }
}

export function GenerateApiKey(auth, apiKey) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikeys`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(apiKey),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log("error");
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(GenereateApiKeyResponse(json));
            })
    };
}

export function updateApiKey(auth, apiKeyId, status) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikeys/apiKeyId`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(status),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {
                    console.log("error");
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(PutApiKeyResponse(auth));
            })
    };
}

export function getApiKeys(auth) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikeys`,
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
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(GetApiKeysResponse(auth));
            })
    };
}

export function getUserApiKeys(auth, userId) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikeys/userId`,
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
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(GetUserApiKeysResponse(auth));
            })
    };
}

export function deleteApiKey(auth, apiKeyId) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikeys/apiKeyId`,
            {
                method: 'PUT',
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
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(DeleteApiKeyResponse(auth));
            })
    };
}