import * as ActionTypes from '../constants/actionTypes';

export function setError(error) {
    return {
        type: ActionTypes.SET_ERROR,
        error
    }
}

export function errorFetching(error) {
    return {
        type: ActionTypes.ERROR_FETCHING,
        error
    }
}

export function doneFetching() {
    return {
        type: ActionTypes.DONE_FETCHING
    }
}

export function beginFetching(error) {
    return {
        type: ActionTypes.BEGIN_FETCHING
    }
}



export function setTransformerContent(transformerEditor) {
    return {
        type: ActionTypes.SET_TRANSFORMER_CONTENT,
        transformerEditor
    }
}

export function setTitle(title) {
    return {
        type:ActionTypes.SET_TITLE,
        title
    }
}

// export function loadSelection(selection) {
//     return {
//         type:ActionTypes.LOAD_SELECTION,
//         selection
//     }
// }

// export function setNannyEditor(editor) {
//     return {
//         type:ActionTypes.SET_NANNY_EDITOR,
//         editor
//     }
//}
