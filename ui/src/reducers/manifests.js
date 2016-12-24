import * as ActionTypes from '../constants/actionTypes'

function loadManifests (state, manifests) {
  let mapManifests = manifests.map(manifest => {
    return {
      id: manifest._id,
      title: manifest.title,
      manifest: manifest.manifest,
      raw: manifest.raw
    }
  });
  return Object.assign([], state, mapManifests)
}

export default function(state = [], action) {
    switch(action.type){
        case ActionTypes.LOAD_MANIFESTS:
            return loadManifests(state, action.manifests);
        default: 
            return state;
    }
}