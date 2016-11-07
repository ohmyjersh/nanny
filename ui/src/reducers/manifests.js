import * as ActionTypes from '../constants/actionTypes'
import Immutable from 'immutable';

function loadManifests(state, manifests) {
    return Immuteable.fromJS(manifests);
}

export default function(state = Immuteable.fromJS([]), action) {
    switch(action.type){
        case ActionTypes.LOAD_MANIFESTS:
            return loadManifests(state, action.manifests);
        default: 
            return state;
    }
}