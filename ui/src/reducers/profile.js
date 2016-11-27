import * as ActionTypes from '../constants/actionTypes'

function resetChangePassword(state) {
    return Object.assign({}, state, initialState);
}

function updateChangePassword(state, newValue) {
    //keeping this here for now, will convert to use immutable in the future
//     var immutUpdate = Immutable.fromJS(state);
//     var newStuff =  immutUpdate.setIn(['createNew', newValue.key], newValue.value);
//     return newStuff.toJS();
// //     console.log(newStuff.toJS());
    return Object.assign( {}, state, { changePassword: Object.assign( {}, state.changePassword, { [newValue.key]: newValue.value } ) } );
}

function setProfile(state, newValue) {
        //keeping this here for now, will convert to use immutable in the future
//     var immutUpdate = Immutable.fromJS(state);
//     var newStuff =  immutUpdate.setIn(['createNew', newValue.key], newValue.value);
//     return newStuff.toJS();
// //     console.log(newStuff.toJS());
    return Object.assign( {}, state, { profile: Object.assign( {}, state.profile, { [newValue.key]: newValue.value } ) } );
}

function setApikeys(state, keys) {
    return Object.assing({}, state, {apiKeys:keys});
}

function setUserActivity(state, activity) {
    return Object.assing({}, state, {userAcivity:activity});
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