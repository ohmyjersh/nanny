import isJSON from 'is-json';

export function mapEditorContent(editorState, raw, text) {
    return {
        editorState:editorState,
        rawContent: raw,
        textContent: text,
        isValid: isJSON.strict(text),
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
