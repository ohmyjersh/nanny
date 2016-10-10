import React, { Component } from 'react'
import Draft, { Editor, EditorState, RichUtils, convertFromRaw, createFromRaw, createEmpty, ContentState } from 'draft-js'
var format = require('string-template')
var isJSON = require('is-json')

export default class TransformerEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.focus = () => this.refs.editor.focus()
  }

  componentWillReceiveProps (newProps) {
    var configEditor = newProps.state.configEditor;
    var transformerEditor = newProps.state.transformerEditor;
    var contentParsed = JSON.parse(configEditor.rawContent)
      if (isJSON.strict(transformerEditor.isValid)) {
        // send rawContent with transformer Object
        var transformer = JSON.parse(transformerEditor.textContent);
        console.log(transformer);
        var formatted = format(configEditor.rawContent, transformer)
        var transformedContent = JSON.parse(formatted)
        var formatParsed = Object.assign({}, contentParsed, transformedContent)
        const newContentState = convertFromRaw(formatParsed)
        const editorState = EditorState.push(this.state.editorState, newContentState)
        this.setState({editorState})
      }
      else {
        const newContentState = convertFromRaw(contentParsed)
        const editorState = EditorState.push(this.state.editorState, newContentState)
        this.setState({editorState})
      }
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
          onChange={this.onChange}
          readOnly={true}
          placeholder='Preview....'
          ref='editor' />
      </div>
    )
  }
}
