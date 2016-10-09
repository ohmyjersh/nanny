import React, { Component, PropTypes } from 'react'
import Draft, { convertFromRaw, convertToRaw, Modifier, Editor, EditorState, RichUtils, ContentState, Decorator, SelectionState } from 'draft-js'
import { getSelectionRange, getSelectedBlockElement, getSelectionCoords } from './utils/selection'
import InlineToolbar, {toolBarActions} from './toolbars/InlineToolbar'
import CodeUtils from 'draft-js-code'

class ConfigEditor extends Component {
  constructor (props) {
    super(props)
    console.log(this.props);
    this.state = {
      editorState: EditorState.createWithContent(this._resetState()),
      inlineToolbar: { show: false }
    }
    this.toggleToolbarActions = (action) => this._toggleToolbarActions(action)
    this._onChange = this._onChange.bind(this)
    this.focus = () => this.refs.editor.focus()
    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.keyBindingFn = (e) => this._keyBindingFn(e)
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
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

  _resetState () {
    return convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: '{\n}'
        }
      ]
    })
  }

  _handleKeyCommand (command) {
    const {editorState} = this.state
    let newState

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command)
    }

    if (!newState) {
      newState = RichUtils.handleKeyCommand(editorState, command)
    }

    if (newState) {
      this._onChange(newState)
      return true
    }
    return false
  }

  _keyBindingFn (e) {
    let editorState = this.state.editorState
    let command

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e)
    }
    if (command) {
      return command
    }

    return Draft.getDefaultKeyBinding(e)
  }

  _onTab (e) {
    let editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this._onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn (e) {
    let editorState = this.state.editorState

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
      const pushedState = EditorState.push(this.state.editorState, this._resetState())
      Object.assign(editorState, pushedState)
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
    // setContentRaw in redux and pipe it back down
    this.setState({editorState})

    const content = this.state.editorState.getCurrentContent();
    this.props.setEditorContent(JSON.stringify(convertToRaw(content)));
  }

  _toggleToolbarActions (action) {
    let {editorState} = this.state
    let state = toolBarActions(editorState, action);
    this._onChange(state)
  }

  render () {
    console.log(this.props.state);
    const { editorState, selectedBlock, selectionRange } = this.state

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
        <Editor
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.keyBindingFn}
          onChange={this._onChange}
          ref='editor'
          spellCheck={true}
          handleReturn={this.onReturn}
          onTab={this.onTab} />
      </div>
    )
  }
}

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 10
  }
}
export default ConfigEditor
