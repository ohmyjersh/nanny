import React, { Component } from 'react'
import Draft, { Editor, EditorState, ContentState, RichUtils, convertFromRaw, convertToRaw } from 'draft-js'
import CodeUtils from 'draft-js-code'
import isJSON from 'is-json';


export default class TransformerEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createWithContent(this._resetState())
    }
    this.onChange = (editorState) => this._onChange(editorState)
    this.focus = () => this.refs.editor.focus()
    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.keyBindingFn = (e) => this._keyBindingFn(e)
    this.onTab = (e) => this._onTab(e)
    this.onReturn = (e) => this._onReturn(e)
  }

  _onChange (editorState) {
    var currentContent = editorState.getCurrentContent()
    if (!currentContent.hasText()) {
      const pushedState = EditorState.push(this.state.editorState, this._resetState())
      Object.assign({}, editorState, pushedState)
    }
    this.setState({editorState})

    const content = this.state.editorState.getCurrentContent();
    this.props.setTransformerContent({
      textContent:content.getPlainText(),
      rawContent:JSON.stringify(convertToRaw(content)),
      isValid:isJSON.strict(content.getPlainText())
    });
  }

  _resetState () {
    return convertFromRaw({
      entityMap: {},
      blocks: [
        {
          type: 'code-block',
          text: '{}'
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
      this.onChange(newState)
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

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    )
  }

  _onReturn (e) {
    let editorState = this.state.editorState

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return
    }

    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    )
    return true
  }
  render () {
    const {editorState} = this.state

    // If the user changes block type before entering any text, we can
    // either style the placeholder or hide it. Let's just hide it now.
    let className = 'RichEditor-editor'
    return (
      <div className='editor' id='richEditor' onClick={this.focus}>
        <Editor
          editorState={editorState}
          handleKeyCommand={this.handleKeyCommand}
          keyBindingFn={this.keyBindingFn}
          onChange={this.onChange}
          ref='editor'
          spellCheck={true}
          handleReturn={this.onReturn}
          onTab={this.onTab} />
      </div>
    )
  }
}
