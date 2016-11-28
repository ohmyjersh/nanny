import * as ActionTypes from '../constants/actionTypes'

const initialChangePassword = {
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
        fetching:false,
        status:''
}

function resetChangePassword(state) {
    return Object.assign( {}, state, { changePassword: Object.assign( {}, state.changePassword, initialChangePassword ) } );
}

function updateChangePassword(state, newValue) {
    console.log(newValue);
    //keeping this here for now, will convert to use immutable in the future
//     var immutUpdate = Immutable.fromJS(state);
//     var newStuff =  immutUpdate.setIn(['createNew', newValue.key], newValue.value);
//     return newStuff.toJS();
// //     console.log(newStuff.toJS());
    return Object.assign( {}, state, { changePassword: Object.assign( {}, state.changePassword, { [newValue.key]: newValue.value } ) } );
}

function updateProfile(state, newValue) {
        //keeping this here for now, will convert to use immutable in the future
//     var immutUpdate = Immutable.fromJS(state);
//     var newStuff =  immutUpdate.setIn(['createNew', newValue.key], newValue.value);
//     return newStuff.toJS();
// //     console.log(newStuff.toJS());
    return Object.assign( {}, state, { profile: Object.assign( {}, state.profile, { [newValue.key]: newValue.value } ) } );
}

const initialState = {
    profile : {
        email:'',
        fetching:false
    },
    changePassword: initialChangePassword
}

export default function(state = initialState, action) {
    switch(action.type) {
    case ActionTypes.CHANGE_PASSWORD_REQUEST:
        return state;
    case ActionTypes.UPDATE_CHANGE_PASSWORD:
        return updateChangePassword(state, action.value);
    case ActionTypes.UPDATE_CHANGE_PROFILE:
        return updateProfile(state, action.value);
    case ActionTypes.RESET_CHANGE_PASSWORD:
        return resetChangePassword(state);
    default:
        return state;
    }
}