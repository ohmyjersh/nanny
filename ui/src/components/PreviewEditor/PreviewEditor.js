import React, { Component } from 'react'
import Draft, { Editor, EditorState, RichUtils, convertFromRaw, createFromRaw, createEmpty, ContentState } from 'draft-js'
var format = require('string-template')
var isJSON = require('is-json')

export default class TransformerEditor extends Component {
  constructor (props) {
    super(props)
    //var state = this.props.state.configEditor ? convertFromRaw(JSON.parse(this.props.configEditor)) : {};
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.focus = () => this.refs.editor.focus()
  }

  componentWillReceiveProps (newProps) {
    let configEditor = newProps.state.configEditor
    let transformerEditor = newProps.state.transformerEditor
    let contentParsed = JSON.parse(configEditor.rawContent)
    if (transformerEditor.isValid) {
        let transformer = JSON.parse(transformerEditor.textContent)
        let formatted = format(configEditor.rawContent, transformer)
        let transformedContent = JSON.parse(formatted)
        let formatParsed = Object.assign({}, contentParsed, transformedContent)
        let newContentState = convertFromRaw(formatParsed)
        let editorState = EditorState.push(this.state.editorState, newContentState)
        this.setState({editorState});
    } else {
      let newContentState = convertFromRaw(contentParsed)
      let editorState = EditorState.push(this.state.editorState, newContentState)
      this.setState({editorState})
    }
  }

  render () {
    const {editorState} = this.state
    let className = 'RichEditor-editor'
    return (
      <div className='editor' id='richEditor' onClick={this.focus} style={{'width':this.props.editorSize}}>
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
