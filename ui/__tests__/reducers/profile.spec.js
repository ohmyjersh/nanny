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
    },
    userAcivity: [],
    apiKeys:[]
}


test('change profile', () => {

})

test('change password', () => {

});

test('adds apikeys', () => {

})

test('adds user activity', () => {
    
})