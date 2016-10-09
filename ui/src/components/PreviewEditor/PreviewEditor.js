import React, { Component } from 'react'
import Draft, { Editor, EditorState, RichUtils, convertFromRaw, createFromRaw, createEmpty, ContentState } from 'draft-js'
var format = require("string-template");

export default class TransformerEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.focus = () => this.refs.editor.focus()
  }

    componentWillReceiveProps(newProps) {
    console.log(newProps.state.rawTransformer);
    console.log(newProps.state.rawContent);
    var rawContent = newProps.state.rawContent;
    var transformer = JSON.parse(newProps.state.rawTransformer);
    var formatted = format(rawContent,transformer);
    const newContentState = convertFromRaw(JSON.parse(formatted));
    const editorState = EditorState.push(this.state.editorState, newContentState);
    this.setState({editorState});
    // const newContentState = convertFromRaw(JSON.parse(newProps.state.rawContent));
    // const editorState = EditorState.push(this.state.editorState, newContentState);
    // this.setState({editorState});
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
