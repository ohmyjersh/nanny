import * as actionTypes from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/users';


const initial = {users:[],createNew:{
    open:false,
    email: '',
    password: '',
    confirmPassword: '',
    role:'Basic',
    error: '',
    valid: false
}};

test('it should update password on createNew object', () => {
    let newCreate = {key:'password', value:'asdf'};

    let expected = {users:[], createNew:{
            open:false,
            email: '',
            password: 'asdf',
            confirmPassword: '',
            role:'Basic',
            error: '',
            valid: false
    }};
    expect(reducer(initial,{type:actionTypes.UPDATE_CREATE_USER,value:newCreate})).toEqual(expected);
});

test('it should make creatNew object look good', () => {
    let newCreate = {key:'valid', value:true};

    let expected = {users:[], createNew:{
            open:false,
            email: '',
            password: '',
            confirmPassword: '',
            role:'Basic',
            error: '',
            valid: true
    }};
    expect(reducer(initial,{type:actionTypes.UPDATE_CREATE_USER,value:newCreate})).toEqual(expected);
});

test('it should hydrate users from the api correctly', () => {
    let users = [{_id:'1234', email:'lolbutts@yourmom.com',role:'Admin',createdAt:'2016-11-03T10:47:05.674Z'},
                {_id:'31137', email:'dudethings@yourdad.com',role:'Basic',createdAt:'2014-11-03T10:47:05.674Z'},
                {_id:'1337', email:'hehe@keke.com',role:'Admin',createdAt:'2016-10-03T10:47:05.674Z'}];
    let expected = {users:users,createNew:initial.createNew};
    expect(reducer(initial,{type:actionTypes.GET_USERS_RESPONSE,users:users})).toEqual(expected);
});


