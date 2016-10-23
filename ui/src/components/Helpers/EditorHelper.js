import isJSON from 'is-json';
import { convertFromRaw,createWithContent, convertToRaw, Editor, EditorState } from 'draft-js'

export function initNewEditor(editor) {
    var state = EditorState.createWithContent(convertFromRaw(startState()));
    const content = state.getCurrentContent()
    editor(
      mapEditorContent(
        state,
        JSON.stringify(convertToRaw(content)),
        content.getPlainText(),''))
  }


export function mapEditorContent(editorState, raw, text, id) {
  console.log(id);
  console.log("called mapEditorContent");
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

export function paddedStrategy(contentState, contentBlock, callback) {
    findWithRegex(/^(({.+}))$/g, contentBlock, callback);
  }

  function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      callback(start, start + matchArr[0].length);
    }
  }
