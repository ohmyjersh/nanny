import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";
import cookie from 'react-cookie';
import { Router, browserHistory } from 'react-router';

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

export function logOut() {
    cookie.remove('token', { path: '/' });
    return {
        type: ActionTypes.LOGOUT
    }
}

export function register(register) {
    return dispatch => {
        dispatch(registerRequest())
        return fetch(`${Config.API_HOST}/authentication/register`,
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
                return browserHistory.push('/nannydashboard');
                //window.location.href = 'http://localhost:3000/dashboard';
            })
    };
}