import * as ActionTypes from '../constants/actionTypes'

function setNannyEditor(state, editor, content = initialState(editor)) {
    return Object.assign({}, state, content, {editor:editor, currentSelection: -1});
}

function loadSelection(state, selection, editor, loaded) {
  let selected = loaded[selection];
  return Object.assign({}, state, {
      id:selected.id,
      rawContent:selected.raw,
      textContent: selected.configuration,
      title:selected.title,
      editor:editor,
      currentSelection:selection
    });
}

function setTitle (state, title) {
  return Object.assign({}, state, {title: title})
}


export const initialState = (editor = '') => {
    return {
        id: '',
        currentSelection: -1,
        editorState: '',
        rawContent: '',
        textContent: '',
        isValid: true,
        title: '',
        editor: editor
    }
};

export default function (state = initialState('configuration'), action) {
    switch (action.type) {
        case ActionTypes.SET_NANNY_EDITOR:
            return setNannyEditor(state, action.editor, action.content);
        case ActionTypes.LOAD_SELECTION:
            return loadSelection(state, action.selection, action.editor, action.loaded);
        case ActionTypes.SET_TITLE:
            return setTitle(state, action.title)
        default:
            return state;
    }
}