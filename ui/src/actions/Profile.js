import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function generateApiKeyResponse(response) {
    return {
        type: ActionTypes.GENERATE_APIKEY_RESPONSE,
        response:response
    }
}

export function generateApiKey(user) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/apikey`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
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
                dispatch(generateApiKeyResponse(json));
            })
    };
}