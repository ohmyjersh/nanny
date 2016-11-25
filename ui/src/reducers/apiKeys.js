import * as ActionTypes from '../constants/actionTypes'

function generatingApiKey(state, status) {
    console.log(status);
    return Object.assign({}, state, {generating:status});
}

function setApiKey(state, apiKey) {
        console.log(apiKey);
    return Object.assign({}, state, {apiKey:apiKey});
}

function getApiKeys(state, keys) {    
    console.log(status);
    return Object.assign({}, state, {apiKeys:keys})
}

export default function reducer(state = {apiKeys:[],generating:false, apiKey:''}, action) {
    switch(action.type) {
        case ActionTypes.GENERATE_APIKEY_REQUEST:
            return generatingApiKey(state, action.status);
        case ActionTypes.GENERATE_APIKEY_RESPONSE:
            return setApiKey(state,action.apiKey);
        case ActionTypes.GET_APIKEY_REPSONSE:
            return setApiKey(state,action.keys);
        default:
            return state;
    }
}