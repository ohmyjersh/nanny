import isJSON from 'is-json';
import { convertFromRaw, convertToRaw, EditorState } from 'draft-js'

export function initNewEditor(editor, type) {
    var start = type === 'configuration' || type === 'transformer' ? startState() : startManifest();
    var state = EditorState.createWithContent(convertFromRaw(start));
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

export function startState(text = '{\n}'){
    return  {
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: text
        }
      ]
    }
}

export function startManifest() {
      return  {
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: '{\n\t "configurations":{},\n\t "transformers":{}\n}'
        }
      ]
    }
}
