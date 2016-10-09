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
    var rawContent = newProps.state.rawContent
    var rawTransformer = newProps.state.rawTransformer
    var contentParsed = JSON.parse(rawContent)

    if (isJSON.strict(rawTransformer) && rawTransformer != '{}') {
      // send rawContent with transformer Object
      var transformer = JSON.parse(rawTransformer)
      console.log(transformer);
      //console.log(transformer);
      var formatted = format(rawContent, transformer)
      var transformedContent = JSON.parse(formatted);
      contentParsed = Object.assign({}, contentParsed, transformedContent);
    }

    const newContentState = convertFromRaw(contentParsed)
    const editorState = EditorState.push(this.state.editorState, newContentState)
    this.setState({editorState})

    // var transformer = JSON.parse(rawTransformer)
    // var formatted = format(rawContent,transformer)

    // if(isJSON.strict(formatted)) {
    //   console.log(isJSON.strict(formatted))
    //   var transformedContent = JSON.parse(formatted)
    //   const newContentState = convertFromRaw(JSON.parse(transformedContent))
    //   const editorState = EditorState.push(this.state.editorState, newContentState)
    //   this.setState({editorState})
    // }

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
