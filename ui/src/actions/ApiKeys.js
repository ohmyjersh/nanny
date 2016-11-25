import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function GenerateApiKeyRequest() {
    return {
        type: ActionTypes.GENERATE_APIKEY_REQUEST,
        status: true
    }
}

export function GenerateApiKeyResponse(json) {
    return {
        type: ActionTypes.GENERATE_APIKEY_RESPONSE,
        result:json
    }
}

export function GetApiKeysRequest() {
    return {
        type: ActionTypes.GET_APIKEY_REQUEST,
        status: true
    }
}

export function GetApiKeysResponse(json) {
    return {
        type: ActionTypes.GET_APIKEY_RESPONSE,
        result:json
    }
}

export function GetUserApiKeysRequest() {
    return {
        type: ActionTypes.GET_USER_APIKEY_REQUEST,
        status: true
    }
}

export function GetUserApiKeysResponse(json) {
    return {
        type: ActionTypes.GET_USER_APIKEY_RESPONSE,
        keys: json
    }
}

export function DeleteApiKeyRequest() {
    return {
        type: ActionTypes.DELETE_APIKEY_REQUEST,
        status: true
    }
}

export function DeleteApiKeyResponse() {
    return {
        type: ActionTypes.DELETE_APIKEY_RESPONSE,
        status: false
    }
}

export function PutApiKeyRequest() {
    return {
        type: ActionTypes.PUT_APIKEY_REQUEST,
        status: true
    }
}

export function PutApiKeyResponse() {
    return {
        type: ActionTypes.PUT_APIKEY_RESPONSE,
        status: false
    }
}

export function GenerateApiKey(auth, apiKey) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikey`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(apiKey),
                cache: 'default'
            }).then(response => {
                console.log(response);
                if (response.status !== 200) {
                    console.log("error");
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                console.log(json);
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(GenerateApiKeyResponse(json));
            })
    };
}

export function updateApiKey(auth, apiKeyId, status) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikey/${apiKeyId}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
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
                return dispatch(PutApiKeyResponse());
            })
    };
}

export function getApiKeys(auth) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikey`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
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
                return dispatch(GetApiKeysResponse(json));
            })
    };
}

export function getUserApiKeys(auth, userId) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikey/user/${userId}`,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
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
                return dispatch(GetUserApiKeysResponse(json));
            })
    };
}

// export function deleteApiKey(auth, apiKeyId) {
//     return dispatch => {
//         return fetch(`${Config.API_HOST}/apikey/${apiKeyId}`,
//             {
//                 method: 'PUT',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${auth.token}`
//                 },
//                 mode: 'cors',
//                 cache: 'default'
//             }).then(response => {
//                 if (response.status !== 200) {
//                     console.log("error");
//                     //dispatch(setError("error"));
//                 }
//                 return response.json();
//             })
//             .then((json) => {
//                 // could just push these changes to the user id locally so you don't have to make the call
//                 return dispatch(getUserApiKeys(auth));
//             })
//     };
// }