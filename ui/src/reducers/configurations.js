import * as ActionTypes from '../constants/actionTypes'

function loadConfigurations(state, configurations) {
    return Object.assign({}, state.configurations, configurations);
}

export default function(state = [], action) {
    switch(action.type){
        case ActionTypes.LOAD_CONFIGURATIONS:
            return loadConfigurations(state, action.configurations);
        default: 
            return state;
    }
}