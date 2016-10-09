import React from 'react';
import { Modifier, EditorState } from 'draft-js';
import {getText, checkIfPadded} from '../utils/util';
import ToolbarIcon from './ToolbarIcon';

const INLINE_STYLES = [
  { label: '{ }', style: 'none', action: 'padTemplate' },
];

function padTemplate(editorState) {
    let content = editorState.getCurrentContent()
    let selectionState = editorState.getSelection()
    let selectedText = getText(editorState, selectionState)
    let text = checkIfPadded(selectedText) ? selectedText.slice(1, -1) : '{' + selectedText + '}'
    let replaced = Modifier.replaceText(
      content,
      selectionState,
      text,
      null
    )
    editorState = EditorState.push(
      editorState,
      replaced,
      'replace-text'
    )
    return editorState;
}

export function toolBarActions(editorState, action) {
    switch(action) {
      case 'padTemplate':
          return padTemplate(editorState);
    }
    return editorState;
};

export default ({ editorState, onToggle, position }) => {
  const currentStyle = editorState.getCurrentInlineStyle();
  return (
    <div
      className="toolbar"
      id="inlineToolbar"
      style={position}
    >
      <ul className="toolbar-icons">
        {INLINE_STYLES.map(type =>
          <ToolbarIcon
            key={type.label || type.icon}
            active={currentStyle.has(type.style)}
            label={type.label}
            icon={type.icon}
            onToggle={onToggle}
            style={type.style}
            action={type.action}
          />
        )}
      </ul>
    </div>
  )
};
