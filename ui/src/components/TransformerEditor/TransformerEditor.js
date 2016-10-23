import React, { Component } from 'react'
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js'
import CodeUtils from 'draft-js-code'
import { mapEditorContent, initNewEditor } from '../Helpers/EditorHelper'
import Subheader from 'material-ui/Subheader';

export default class TransformerEditor extends Component {
  constructor(props) {
    super(props)
    this.props.state.transformerEditor.editorState
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.state.transformerEditor.rawContent)))
      : initNewEditor(this.props.actions.app.setTransformerContent);
    this.state = {
      inlineToolbar: { show: false }
    }

    this.onChange = (editorState) => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }

  _onChange(editorState) {
    var currentContent = editorState.getCurrentContent()
    if (!currentContent.hasText()) {
      return initNewEditor(this.props.actions.app.setTransformerContent);
    }
    this.props.actions.app.setTransformerContent(
      mapEditorContent(
        editorState,
        JSON.stringify(convertToRaw(currentContent)),
        currentContent.getPlainText()
      ));
  }

  _onTab(e) {
    let editorState = this.props.state.transformerEditor.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn(e) {
    let editorState = this.props.state.transformerEditor.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  render() {
    const {editorState} = this.props.state.transformerEditor;
    return (
      <div className='editorDashboard' style={{ 'width': this.props.editorSize }}>
        <Subheader>Transformer</Subheader>
        <div className='editor' id='richEditor' onClick={this.focus} style={{ 'width': this.props.editorSize }}>
          {editorState ? <Editor
            editorState={editorState}
            onChange={this.onChange}
            ref='editor'
            spellCheck={true}
            handleReturn={this.onReturn}
            onTab={this.onTab} /> : null}
        </div>
      </div>
    )
  }
}
