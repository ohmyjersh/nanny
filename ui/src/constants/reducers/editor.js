import * as ActionTypes from '../constants/actionTypes'
import Immutable from 'immutable';

function setNannyEditor(state, editor) {
    return Object.assign({}, state, {

    });
}



const initialState = (type = '') => {
    return {
        id: '',
        currentSelection: '',
        editorState: '',
        rawContent: '',
        textContent: '',
        isValid: true,
        title: '',
        type: type
    }
};

export default function (state = Immutable.fromJS(initialState), action) {
    switch (action.type) {
        case ActionTypes.setNannyEditor:
            return setNannyEditor();
        case ActionTypes.resetEditor():
            return resetEditor();
        default:
            return state;
    }
}