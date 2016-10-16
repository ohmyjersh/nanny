import React, { Component } from 'react'
import Draft, { Editor, EditorState, convertFromRaw, ContentState } from 'draft-js'
var format = require('string-template')
import { startState } from '../Helpers/EditorHelper'

export default class TransformerEditor extends Component {
  constructor(props) {
    super(props)
    var editorState = this.props.state.configEditor.rawContent
      ? EditorState.createWithContent(this.mapPropsToPreviewState(props))
      : EditorState.createWithContent(convertFromRaw(startState()));;
    this.state = {
      editorState: editorState
    }
    this.onChange = (editorState) => this.setState({ editorState })
    this.focus = () => this.refs.editor.focus()
  }

  componentWillReceiveProps(newProps) {
      let newContentState = this.mapPropsToPreviewState(newProps);
      let editorState = EditorState.push(this.state.editorState, newContentState)
      this.setState({ editorState })
  }

  mapPropsToPreviewState(props) {
    let configEditor = props.state.configEditor
    let transformerEditor = props.state.transformerEditor
    let contentParsed = JSON.parse(configEditor.rawContent)
    let newContentState;
    if (transformerEditor.isValid) {
      let transformer = JSON.parse(transformerEditor.textContent)
      let formatted = format(configEditor.rawContent, transformer)
      let transformedContent = JSON.parse(formatted)
      let formatParsed = Object.assign({}, contentParsed, transformedContent)
      newContentState = convertFromRaw(formatParsed)
    } else {
      newContentState = convertFromRaw(contentParsed)
    }
    return newContentState;
  }

  render() {
    const {editorState} = this.state
    return (
      <div className='editor' id='richEditor' onClick={this.focus} style={{ 'width': this.props.editorSize }}>
        <Editor
          editorState={editorState}
          onChange={this.onChange}
          readOnly={true}
          ref='editor' />
      </div>
    )
  }
}
