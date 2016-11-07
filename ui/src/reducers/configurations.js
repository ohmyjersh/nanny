import * as ActionTypes from '../constants/actionTypes'
import Immutable from 'immutable';

function loadConfigurations(state, configurations) {
    return Immuteable.fromJS(configurations);
}

export default function(state = Immuteable.fromJS([]), action) {
    switch(action.type){
        case ActionTypes.LOAD_CONFIGURATIONS:
            return loadConfigurations(state, action.configurations);
        default: 
            return state;
    }
}