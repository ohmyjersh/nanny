import * as actionTypes from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/profile';

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
    }
}

const populatedState = {
    profile : {
        email:'asdf@asdf.com',
        fetching:true
    },
    changePassword: {
        oldPassword:'oldPassword1!',
        newPassword:'newPassword1!',
        confirmPassword:'newPassword1!',
        fetching:false,
        status:'Password Changed!'
    }
}


test('change profile', () => {
    let changeProfile = {key:'email',value:'stuff@stuffers.com'};
    let expected = {
        profile : {
            email:'stuff@stuffers.com',
            fetching:false
        },
        changePassword: {
            oldPassword:'',
            newPassword:'',
            confirmPassword:'',
            fetching:false,
            status:''
        }
    };
    expect(reducer(initialState, {type:actionTypes.UPDATE_CHANGE_PROFILE,value:changeProfile})).toEqual(expected);
})

test('change password', () => {
    let changePassword = {key:'newPassword',value:'secretPassword!@'};
    let expected = {
        profile : {
            email:'',
            fetching:false
        },
        changePassword: {
            oldPassword:'',
            newPassword:'secretPassword!@',
            confirmPassword:'',
            fetching:false,
            status:''
        }
    };
    expect(reducer(initialState, {type:actionTypes.UPDATE_CHANGE_PASSWORD,value:changePassword})).toEqual(expected);
});