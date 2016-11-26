import * as ActionTypes from '../constants/actionTypes'

function resetChangePassword(state) {
    return Object.assign({}, state, initialState);
}

function updateChangePassword(state, newValue) {
    return Object.assign({}, state, state.changePassword[newValue.key]=newValue.value);
}

function setProfile(state, newValue) {
    return Object.assign({}, state, state.profile[newValue.key]=newValue.value);
}

function setApikeys(state, keys) {
    return Object.assing({}, state, state.apiKeys:keys);
}

function setUserActivity(state, activity) {
    return Object.assing({}, state, state.userAcivity:keys);
}


const initialState = {
    profile : {
        email:'',
        fetching:false
    },
    changePassword: {
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        fetching:false,
        status:''
    },
    userAcivity: [],
    apiKeys:[]
}
export default function(state = initialState, action) {
    switch(action.type) {
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
        return state;
    default:
        return state;
    }
}