import * as ActionTypes from '../constants/actionTypes'
import Immutable from 'immutable';

function setNannyEditor(state, editor) {
    return Immutable.fromJS(initialState(editor));
}



const initialState = (editor = '') => {
    return {
        id: '',
        currentSelection: '',
        editorState: '',
        rawContent: '',
        textContent: '',
        isValid: true,
        title: '',
        editor: editor
    }
};

export default function (state = Immutable.fromJS(initialState('configuration')), action) {
    switch (action.type) {
        case ActionTypes.SET_NANNY_EDITOR:
            return setNannyEditor(state, action.editor);
        default:
            return state;
    }
}