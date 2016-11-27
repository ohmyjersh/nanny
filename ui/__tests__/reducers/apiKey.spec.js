import * as actionTypes from '../../src/constants/actionTypes';
import reducer from '../../src/reducers/apiKeys';

const initialState = {
    apiKeys:[],
    userApiKeys:[],
    userActivity:[],
    usersActivities:[],
        generating:false,
        apiKey:''
}

test('adds apikeys', () => {
    let apiKeys = [{apiKey:'...####apikey1', Title:'apikey1', Status:'Active', Created:'11-15-2015'},
    {apiKey:'...####apikey2', Title:'apikey2', Status:'Disabled', Created:'02-20-2015'},
    {apiKey:'...####apikey3', Title:'apikey3', Status:'Active', Created:'06-10-2016'},
    {apiKey:'...####apikey4', Title:'apikey4', Status:'Disabled', Created:'11-15-2016'}];
    let expected = {
        apiKeys:[],
        userApiKeys:apiKeys,
        userActivity: [],
        usersActivities:[],
        generating:false,
        apiKey:''
    };
    expect(reducer(initialState, {type:actionTypes.GET_USER_APIKEY_RESPONSE,apiKeys})).toEqual(expected);
 });