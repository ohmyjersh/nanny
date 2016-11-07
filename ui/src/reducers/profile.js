import * as ActionTypes from '../constants/actionTypes'

export default function reducer(state = {apiKeys:[]}, action) {
    switch(action.type) {
        case ActionTypes.GENERATE_APIKEY_RESPONSE:
            return state;
        default:
            return state;
    }
}