import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function getAllUsersResponse(users) {
    return {
        type: ActionTypes.GET_USERS_RESPONSE,
        users
    }
}

export function updateCreate(value) {
    return {
        type: ActionTypes.UPDATE_CREATE_USER,
        value
    }
}

export function getUsers(auth) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/user`,
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
                dispatch(getAllUsersResponse(json));
            })
    };
}

export function updateUsers(auth, user) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/user/${user.id}`,
            {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(user),
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
                return dispatch(getUsers(auth));
            })
    };
}

export function deleteUser(auth, id) {
    return dispatch => {
        return fetch(`${Config.API_HOST}/user/${id}`,
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
                    console.log("error");
                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                // could just pop the changes off the users locally so you don't have to make the call
                return dispatch(getUsers(auth));
            })
    };
}

export function getUserActivity() {

}