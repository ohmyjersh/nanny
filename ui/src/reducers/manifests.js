import * as ActionTypes from '../constants/actionTypes'

function loadManifests(state, manifests) {
    return Object.assign(manifests);
}

export default function(state = [], action) {
    switch(action.type){
        case ActionTypes.LOAD_MANIFESTS:
            return loadManifests(state, action.manifests);
        default: 
            return state;
    }
}