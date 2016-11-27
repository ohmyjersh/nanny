import * as ActionTypes from '../constants/actionTypes'
import ImmutableJs from 'immutable';

function getUsers(state, users) {
    return Object.assign({}, state, {users:users});
}

function updateCreateUser(state, newValue) {
   return Object.assign( {}, state, { createNew: Object.assign( {}, state.createNew, { [newValue.key]: newValue.value } ) } );
}

function initialState() {
    return {users:[],
            createNew:{
            open:false,
            email: '',
            password: '',
            confirmPassword: '',
            error: '',
            valid: false
    }};
}

export default function reducer(state = initialState(), action) {
    switch(action.type) {
        case ActionTypes.GET_USERS_RESPONSE:
            return getUsers(state, action.users);
        case ActionTypes.UPDATE_CREATE_USER:
            return updateCreateUser(state, action.value);
        default:
            return state;
    }
}