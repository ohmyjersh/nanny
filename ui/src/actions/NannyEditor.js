import * as ActionTypes from '../constants/actionTypes';

export function SetNannyEditor(editor, content) {
    return {
        type: ActionTypes.SET_NANNY_EDITOR,
        editor,
        content
    }
}

export function LoadSelection(selection, editor, loaded) {
    return {
        type: ActionTypes.LOAD_SELECTION,
        selection,
        editor,
        loaded
    }
}