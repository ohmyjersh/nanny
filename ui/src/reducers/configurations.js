import * as ActionTypes from '../constants/actionTypes'

function loadConfigurations(state, configurations) {
  let mapConfigurations = configurations.map(configuration => {
      return {
        id: configuration._id,
        title: configuration.title,
        configuration: configuration.configuration,
        raw: configuration.raw
      }
  });
  return Object.assign([], state, mapConfigurations);
}

  export default function(state = [], action) {
    switch (action.type) {
      case ActionTypes.LOAD_CONFIGURATIONS:
        return loadConfigurations(state, action.configurations);
      default:
        return state;
    }
  }