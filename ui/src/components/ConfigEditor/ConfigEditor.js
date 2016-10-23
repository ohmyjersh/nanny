import React, { Component } from 'react'
import { convertFromRaw, convertToRaw, Editor, EditorState } from 'draft-js'
import { getSelectionRange, getSelectedBlockElement, getSelectionCoords } from './utils/selection'
import InlineToolbar, { toolBarActions } from './toolbars/InlineToolbar'
import CodeUtils from 'draft-js-code'
import { mapEditorContent, initNewEditor } from '../Helpers/EditorHelper'
import Subheader from 'material-ui/Subheader'

class ConfigEditor extends Component {
  constructor (props) {
    super(props)
    console.log(this.props.state.configEditor.editorState)
    this.props.state.configEditor.editorState
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.state.configEditor.rawContent)))
      : initNewEditor(this.props.actions.app.setEditorContent)
    this.state = {
      inlineToolbar: { show: false }
    }

    this.toggleToolbarActions = (action) => this._toggleToolbarActions(action)
    this._onChange = this._onChange.bind(this)
    this.focus = () => this.refs.editor.focus()
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }
  componentWillReceiveProps (newProps) {
    if (this.props.state.configEditor.currentSelection != newProps.state.configEditor.currentSelection) {
    let contentParsed = JSON.parse(newProps.state.configEditor.rawContent);
    let newContentState = convertFromRaw(contentParsed);
    let editorState = EditorState.push(newProps.state.configEditor.editorState, newContentState)
    var currentContent = editorState.getCurrentContent()
    this.props.actions.app.setEditorContent(
      mapEditorContent(
        editorState,
        JSON.stringify(convertToRaw(currentContent)),
        currentContent.getPlainText()))
    }
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
    let editorState = this.props.state.configEditor.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn (e) {
    let editorState = this.props.state.configEditor.editorState

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
      return initNewEditor(this.props.actions.app.setEditorContent)
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
    this.props.actions.app.setEditorContent(
      mapEditorContent(
        editorState,
        JSON.stringify(convertToRaw(currentContent)),
        currentContent.getPlainText()))
  }

  _toggleToolbarActions (action) {
    let {editorState} = this.props.state.configEditor
    let state = toolBarActions(editorState, action)
    this._onChange(state)
  }

  render () {
    const { selectedBlock } = this.state
    const { editorState } = this.props.state.configEditor
    if (selectedBlock) {
      const editor = document.getElementById('richEditor')
      const editorBounds = editor.getBoundingClientRect()
      const blockBounds = selectedBlock.getBoundingClientRect()
    }

    return (
      <div className='editorDashboard' style={{ 'width': this.props.editorSize }}>
        <Subheader>
          Configuration
        </Subheader>
        <div
          className='editor'
          id='richEditor'
          onClick={this.focus}
          style={{ 'width': this.props.editorSize }}>
          {this.state.inlineToolbar.show
             ? <InlineToolbar editorState={editorState} onToggle={this.toggleToolbarActions} position={this.state.inlineToolbar.position} />
             : null}
          {editorState ? <Editor
                           editorState={editorState}
                           onChange={this._onChange}
                           ref='editor'
                           spellCheck={true}
                           handleReturn={this.onReturn}
                           onTab={this.onTab} /> : null}
        </div>
      </div>
    )
  }
}
export default ConfigEditor
