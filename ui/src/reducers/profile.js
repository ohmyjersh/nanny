import * as ActionTypes from '../constants/actionTypes'

function resetChangePassword() {

}

function updateChangePasswordForm() {

}

function changePasswordRequest() {

}

function changePasswordResponse() {

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