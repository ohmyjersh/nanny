import * as ActionTypes from '../constants/actionTypes'

function generatingApiKey(state, status) {
    return Object.assign({}, state, {generating:status});
}

function setApiKey(state, result) {
    return Object.assign({}, state, {apiKey:result.apiKey});
}

function getApiKeys(state, keys) {    
    return Object.assign({}, state, {apiKeys:keys})
}

function getUserApiKeys(state, apiKeys) {
    return Object.assign({}, state, {userApiKeys:apiKeys});
}

export default function reducer(state = {apiKeys:[],
    userApiKeys:[],
    userActivity:[],
    usersActivities:[],generating:false, apiKey:''}, action) {
    switch(action.type) {
        case ActionTypes.GENERATE_APIKEY_REQUEST:
            return generatingApiKey(state, action.status);
        case ActionTypes.GENERATE_APIKEY_RESPONSE:
            return setApiKey(state,action.result);
        case ActionTypes.GET_APIKEY_REPSONSE:
            return getApiKeys(state,action.keys);
        case ActionTypes.GET_USER_APIKEY_RESPONSE:
            return getUserApiKeys(state,action.apiKeys);
        default:
            return state;
    }
}