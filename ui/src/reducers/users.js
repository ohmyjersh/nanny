import * as ActionTypes from '../constants/actionTypes'

function getUsers(state, users) {
    console.log(users);
    return Object.assign({}, state, {users:users});
}

export default function reducer(state = {users:[]}, action) {
    switch(action.type) {
        case ActionTypes.GET_USERS_RESPONSE:
            return getUsers(state, action.users);
        default:
            return state;
    }
}