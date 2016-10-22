import * as ActionTypes from '../constants/actionTypes';

export function loadManifests(manifests) {
    return {
        type: ActionTypes.LOAD_MANIFESTS,
        manifests
    }
}