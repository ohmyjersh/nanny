import * as ActionTypes from '../constants/actionTypes'
import Immutable from 'immutable';

function setNannyEditor(state, editor, content = initialState(editor)) {
    return Object.assign({}, state, content, {editor:editor});
}

function loadSelection(state, selection, editor) {
  var configuration = editor[selection];
  return Object.assign({}, state, { configEditor: {
      rawContent: configuration.raw,
      textContent: configuration.configuration,
      editorState: state.configEditor.editorState,
      title: configuration.title,
      currentSelection: selection,
      isValid:false,
      id: configuration.id
  }});
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
            return loadSelection(action.selection, action.editor)
        default:
            return state;
    }
}

// import * as ActionTypes from '../constants/actionTypes'
// import Immutable from 'immutable';

// function setNannyEditor(state, editor, content = initialState(editor)) {
//     return state.set('editorState', content.editorState)
//                 .set('rawContent', content.rawContent)
//                 .set('isValid', content.isValid)
//                 .set('id', content.id)
//                 .set('editor', editor);
// }

// function loadSelection(state, selection, editor) {
//   var configuration = editor[selection];
//   return Object.assign({}, state, { configEditor: {
//       rawContent: configuration.raw,
//       textContent: configuration.configuration,
//       editorState: state.configEditor.editorState,
//       title: configuration.title,
//       currentSelection: selection,
//       isValid:false,
//       id: configuration.id
//   }});
// }


// export const initialState = (editor = '') => {
//     return {
//         id: '',
//         currentSelection: -1,
//         editorState: '',
//         rawContent: '',
//         textContent: '',
//         isValid: true,
//         title: '',
//         editor: editor
//     }
// };

// export default function (state = Immutable.fromJS(initialState('configuration')), action) {
//     switch (action.type) {
//         case ActionTypes.SET_NANNY_EDITOR:
//             return setNannyEditor(state, action.editor, action.content);
//         case ActionTypes.LOAD_SELECTION:
//             return loadSelection(action.selection, action.editor)
//         default:
//             return state;
//     }
// }