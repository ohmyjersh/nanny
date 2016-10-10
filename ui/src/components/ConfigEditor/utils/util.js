export function getText (editorState, selectionState) {
    let start = selectionState.getStartOffset()
    let end = selectionState.getEndOffset()
    let key = selectionState.getAnchorKey()
    let block = editorState.getCurrentContent().getBlockForKey(key)
    let selectedText = block.getText().slice(start, end)
    return selectedText
  }

export function checkIfPadded (selectedText) {
    return /^(({.+}))$/.test(selectedText)
  }