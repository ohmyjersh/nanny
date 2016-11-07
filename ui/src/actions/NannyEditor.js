import * as ActionTypes from '../constants/actionTypes';

export function SetNannyEditor(editor) {
    return {
        type: ActionTypes.SET_NANNY_EDITOR,
        editor
    }
}