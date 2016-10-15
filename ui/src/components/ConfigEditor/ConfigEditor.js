import React, { Component, PropTypes } from 'react'
import Draft, { CompositeDecorator, convertFromRaw, convertToRaw, Modifier, Editor, EditorState, RichUtils, ContentState, Decorator, SelectionState } from 'draft-js'
import { getSelectionRange, getSelectedBlockElement, getSelectionCoords } from './utils/selection'
import InlineToolbar, { toolBarActions } from './toolbars/InlineToolbar'
import CodeUtils from 'draft-js-code'
import isJSON from 'is-json'
import { mapEditorContent, startState, paddedStrategy } from '../Helpers/EditorHelper'

class ConfigEditor extends Component {
  constructor (props) {
    super(props)
    this.props.state.configEditor.editorState ? EditorState.createWithContent(convertFromRaw(this.props.configEditor.contentRaw)) : this.initNewEditor();
    this.state = {
      inlineToolbar: { show: false }
    }

    this.toggleToolbarActions = (action) => this._toggleToolbarActions(action)
    this._onChange = this._onChange.bind(this)
    this.focus = () => this.refs.editor.focus()
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }

  initNewEditor() {
    var state = EditorState.createWithContent(convertFromRaw(startState()));
    const content = state.getCurrentContent()
        this.props.setEditorContent(
        mapEditorContent(
        state,
        JSON.stringify(convertToRaw(content)),
        content.getPlainText()));
  }

  _updateSelection () {
    const selectionRange = getSelectionRange()
    let selectedBlock
    if (selectionRange) {
      selectedBlock = getSelectedBlockElement(selectionRange)
    }
    this.setState({
      selectedBlock,
    selectionRange})
  }

  _onTab (e) {
    let editorState = this.props.state.configEditor.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn (e) {
    let editorState = this.props.state.configEditor.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }

  _onChange (editorState) {
    var currentContent = editorState.getCurrentContent()
    if (!currentContent.hasText()) {
      const pushedState = EditorState.push(this.props.state.configEditor.editorState, convertFromRaw(startState()))
      Object.assign({}, editorState, pushedState)
    }

    if (!editorState.getSelection().isCollapsed()) {
      const selectionRange = getSelectionRange()
      const selectionCoords = getSelectionCoords(selectionRange)
      this.setState({
        inlineToolbar: {
          show: true,
          position: {
            top: selectionCoords.offsetTop,
            left: selectionCoords.offsetLeft
          }
        }
      })
    } else {
      this.setState({ inlineToolbar: { show: false } })
    }
    this.props.setEditorContent(
      mapEditorContent(
        editorState,
        JSON.stringify(convertToRaw(currentContent)),
        currentContent.getPlainText()));
  }

  _toggleToolbarActions (action) {
    let {editorState} = this.props.state.configEditor
    let state = toolBarActions(editorState, action)
    this._onChange(state)
  }

  render () {
    const { selectedBlock, selectionRange } = this.state;
    const { editorState } = this.props.state.configEditor;
    console.log(editorState);
    if (selectedBlock) {
      const editor = document.getElementById('richEditor')
      const editorBounds = editor.getBoundingClientRect()
      const blockBounds = selectedBlock.getBoundingClientRect()
    }

    return (
      <div className='editor' id='richEditor' onClick={this.focus}>
        {this.state.inlineToolbar.show
           ? <InlineToolbar editorState={editorState} onToggle={this.toggleToolbarActions} position={this.state.inlineToolbar.position} />
           : null}
        {editorState ? <Editor
          editorState={editorState}
          onChange={this._onChange}
          ref='editor'
          spellCheck={true}
          handleReturn={this.onReturn}
          onTab={this.onTab} /> : null }
      </div>
    )
  }
}
export default ConfigEditor
