import React, { Component } from 'react'
import Draft, { Editor, EditorState, RichUtils, convertFromRaw, createEmpty } from 'draft-js'
export default class TransformerEditor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onChange = (editorState) => this.setState({editorState})
    this.focus = () => this.refs.editor.focus()
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
          placeholder="Preview...."
          ref='editor' />
      </div>
    )
  }
}
