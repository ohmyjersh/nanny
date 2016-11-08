import isJSON from 'is-json';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

export function initNewEditor(editor, type) {
    var state = EditorState.createWithContent(convertFromRaw(startState()));
    const content = state.getCurrentContent()
    editor(type,
      mapEditorContent(
        state,
        JSON.stringify(convertToRaw(content)),
        content.getPlainText(),
        ''))
  }


export function mapEditorContent(editorState, raw, text, id) {
    return {
        editorState:editorState,
        rawContent: raw,
        textContent: text,
        isValid: isJSON.strict(text),
        id:id
    }
}

export function initNewTransformer(editor) {
    var state = EditorState.createWithContent(convertFromRaw(startState()));
    const content = state.getCurrentContent()
    editor(
      mapTransformerContent(
        state,
        JSON.stringify(convertToRaw(content)),
        content.getPlainText()));
  }


export function mapTransformerContent(editorState, raw, text) {
    return {
        editorState:editorState,
        rawContent: raw,
        textContent: text,
        isValid: isJSON.strict(text)
    }
}

export function startState(){
    return  {
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: '{\n}'
        }
      ]
    }
}
