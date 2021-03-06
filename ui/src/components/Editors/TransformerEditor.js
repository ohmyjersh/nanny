import React, { Component } from 'react'
import { convertToRaw, Editor } from 'draft-js'
import CodeUtils from 'draft-js-code'
import { mapTransformerContent, initNewTransformer } from './EditorHelper'
import Subheader from 'material-ui/Subheader';

export default class TransformerEditor extends Component {
  constructor(props) {
    super(props)
    if(!this.props.state.transformerEditor.editorState)
      initNewTransformer(this.props.actions.app.setTransformerContent);

    this.onChange = (editorState) => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }

  _onChange(editorState) {
    var currentContent = editorState.getCurrentContent()
    if (!currentContent.hasText()) {
      return initNewTransformer(this.props.actions.app.setTransformerContent);
    }
    this.props.actions.app.setTransformerContent(
      mapTransformerContent(
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
