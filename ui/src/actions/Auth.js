import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

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
        type: ActionTypes.LOGIN,
        response: response
    }
}

export function changePasswordRequest(){
    return {
        type: ActionTypes.CHANGE_PASSWORD_REQUEST,
        fetching: true
    }
}

export function changePasswordResponse(json){
    return {
        type: ActionTypes.CHANGE_PASSWORD_RESPONSE,
        json
    }
}

export function submitPasswordChange(auth, passwords) {
 return dispatch => {
        return fetch(`${Config.API_HOST}/changepassword`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.token}`
                },
                mode: 'cors',
                body: JSON.stringify(passwords),
                cache: 'default'
            }).then(response => {
                if (response.status !== 200) {

                    //dispatch(setError("error"));
                }
                return response.json();
            })
            .then((json) => {
                // could just push these changes to the user id locally so you don't have to make the call
                return dispatch(changePasswordResponse(json));
            })
    };

}


export function logOut() {
    cookie.remove('nannyCookie', { path: '/' });
    browserHistory.push('/');
    return {
        type: ActionTypes.LOGOUT
    }
}

export function register(register) {
    console.log(register);
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
                cookie.save('nannyCookie', json, { path: '/' });
                dispatch(loginResponse(json));
                return browserHistory.push('/dashboard');
            })
    };
}

export function changePassword(passwords) {
    return dispatch => {
        dispatch(loginRequest())
        return fetch('http://localhost:3003/api/authentication/changepassword',
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                body: JSON.stringify({
                    confirmedPassword: passwords.confirmedPasswords,
                    oldPassword: passwords.oldPassword
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
                console.log(json);
            })
    };
}