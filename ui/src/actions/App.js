import * as ActionTypes from '../constants/actionTypes';

export function apiRequest(configurations) {
    return {
        type: ActionTypes.API_REQUEST,
        configurations
    }
}

export function setEditorContent(configEditor) {
    return {
        type: ActionTypes.SET_EDITOR_CONTENT,
        configEditor
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