import React, { Component } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
var format = require('string-template')
import { startState } from '../Helpers/EditorHelper'
import Subheader from 'material-ui/Subheader';

export default class TransformerEditor extends Component {
  constructor(props) {
    super(props)
    var editorState = this.props.state.nannyEditor.rawContent
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
    let nannyEditor = props.state.nannyEditor
    let transformerEditor = props.state.transformerEditor
    let contentParsed = JSON.parse(nannyEditor.rawContent)
    let newContentState;
    if (transformerEditor.isValid && nannyEditor.isValid) {
      let transformer = JSON.parse(transformerEditor.textContent)
      let formatted = format(nannyEditor.rawContent, transformer)
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
      <div className='editorDashboard' style={{ 'width': this.props.editorSize }}>
        <Subheader>Preview</Subheader>
        <div className='editor' id='richEditor' onClick={this.focus} style={{ 'width': this.props.editorSize }}>
          <Editor
            editorState={editorState}
            onChange={this.onChange}
            readOnly={true}
            ref='editor' />
        </div>
      </div>
    )
  }
}
