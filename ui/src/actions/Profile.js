import * as ActionTypes from '../constants/actionTypes';
import * as Config from "../constants/config";

export function resetChangePassword(){
    return {
        type: ActionTypes.RESET_CHANGE_PASSWORD
    }
}

export function updateChangePassword(value){
    return {
        type: ActionTypes.UPDATE_CHANGE_PASSWORD,
        value
    }
}

export function updateProfile(value){
    return {
        type: ActionTypes.UPDATE_CHANGE_PROFILE,
        value
    }
}
