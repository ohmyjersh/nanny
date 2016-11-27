import React, { Component } from 'react'
import { Editor, EditorState, convertFromRaw } from 'draft-js'
var format = require('string-template')
import { startState } from './EditorHelper'
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
    let newContentState;
    if(props.state.nannyEditor.editor === 'configuration') {
      let nannyEditor = props.state.nannyEditor
      let transformerEditor = props.state.transformerEditor
      let contentParsed = JSON.parse(nannyEditor.rawContent)
      if (transformerEditor.isValid && nannyEditor.isValid) {
        let transformer = JSON.parse(transformerEditor.textContent)
        let formatted = format(nannyEditor.rawContent, transformer)
        let transformedContent = JSON.parse(formatted)
        let formatParsed = Object.assign({}, contentParsed, transformedContent)
        newContentState = convertFromRaw(formatParsed)
      } else {
        newContentState = convertFromRaw(contentParsed)
      }
    }
    // else {
    //   let nannyEditor = props.state.nannyEditor;
    //   let contentParsed = JSON.parse(nannyEditor.rawContent);
    //   console.log(nannyEditor.isValid);
    //   if(nannyEditor.isValid) {
    //       var manifest = JSON.parse(nannyEditor.textContent);
    //       var configurations = this.getConfigurations(this.props.state.configurations, manifest.configurations);
    //       var transformed = this.transformConfigs(configurations, manifest.transformer);
    //       console.log(transformed);
    //       //newContentState = convertFromRaw(startState(transformed));
    //       newContentState = convertFromRaw(contentParsed)
    //   } else {
    //     newContentState = convertFromRaw(contentParsed)
    //   }
    // }
    return newContentState;
  }

  getConfigurations(loadedConfigs, configurations) {
    var results = [];
    for(var i = 0; i < loadedConfigs.length; i++)
    {
      for(var s = 0; s < configurations.length; s++) {
        if(loadedConfigs[i].title === configurations[s].title)
        {
          results.push(loadedConfigs[i].rawContent);
        }
      }
    }  
    return results;
  }

  transformConfigs(configurations, transformer) {
      var arr = configurations.map(x => {
          return format(x.textContent, transformer)
      });
      return Object.assign(...arr);
      //let formatted = format(nannyEditor.rawContent, transformer)
        // for (let configuration in configurations) {
        //     let config = {};
        //     for (let key in configurations[configuration]) {
        //         config[key] = format(configurations[configuration][key], transformer)
        //     }
        //     Object.assign(configurations[configuration], config);
        // }
        //return configurations;
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
