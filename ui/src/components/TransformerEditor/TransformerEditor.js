import React, { Component, PropTypes } from 'react'
import Draft, { CompositeDecorator, convertFromRaw, convertToRaw, Modifier, Editor, EditorState, RichUtils, ContentState, Decorator, SelectionState } from 'draft-js'
import CodeUtils from 'draft-js-code'
import isJSON from 'is-json'
import { mapEditorContent, startState, paddedStrategy } from '../Helpers/EditorHelper'

export default class TransformerEditor extends Component {
  constructor (props) {
    super(props)
    this.props.state.transformerEditor.editorState 
    ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.state.transformerEditor.rawContent)))
    : this.initNewEditor();
    this.state = {
      inlineToolbar: { show: false }
    }

    this.onChange = (editorState) => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }

    initNewEditor() {
    var state = EditorState.createWithContent(convertFromRaw(startState()));
    const content = state.getCurrentContent()
        this.props.setTransformerContent(
        mapEditorContent(
        state,
        JSON.stringify(convertToRaw(content)),
        content.getPlainText()));
  }


  _onChange (editorState) {
    var currentContent = editorState.getCurrentContent()
    if (!currentContent.hasText()) {
      const pushedState = EditorState.push(this.props.state.transformerEditor.editorState, convertFromRaw(startState()))
      Object.assign({}, editorState, pushedState)
    }
    this.props.setTransformerContent(
      mapEditorContent(
        editorState,
        JSON.stringify(convertToRaw(currentContent)),
        currentContent.getPlainText()
      ));
  }

  _onTab (e) {
    let editorState = this.props.state.transformerEditor.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn (e) {
    let editorState = this.props.state.transformerEditor.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  render () {
    const {editorState} = this.props.state.transformerEditor;

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    return (
      <div className='editor' id='richEditor' onClick={this.focus}>
        {editorState ? <Editor
          editorState={editorState}
          onChange={this.onChange}
          ref='editor'
          spellCheck={true}
          handleReturn={this.onReturn}
          onTab={this.onTab} /> : null}
      </div>
    )
  }
}
