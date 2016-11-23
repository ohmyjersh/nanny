import * as actionTypes from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/users';

test('it should make creatNew object look good', () => {
    let newCreate = {key:'valid',value:true};
    let initial = {users:[],createNew:{
            open:false,
            email: '',
            password: '',
            confirmPassword: '',
            role:{value:0,text:'Basic'},
            error: '',
            valid: true
    }};
    let expected = {users:[],createNew:{
            open:false,
            email: '',
            password: '',
            confirmPassword: '',
            role:{value:0,text:'Basic'},
            error: '',
            valid: true
    }};
    expect(reducer(initial,{type:actionTypes.UPDATE_CREATE_USER,value:newCreate})).toEqual(expected);
})