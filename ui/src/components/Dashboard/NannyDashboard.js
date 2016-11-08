import React, { Component } from 'react'
import NannyToolbar from './NannyToolbar'
import TextField from 'material-ui/TextField';
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import NannyEditor from '../Editors/NannyEditor'
import PreviewEditor from '../Editors/PreviewEditor'
import TransformerEditor from '../Editors/TransformerEditor'

class NannyDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editors: {}
    }
    this.updateEditor = this._updateEditor.bind(this);
    this.setTitle = this._setTitle.bind(this);
  }

  componentWillMount() {
    this._setEditors(this.props.state.nannyEditor.editor);
    this.props.actions.configuration.getConfigurations(this.props.state.auth);
    this.props.actions.manifest.getManifests(this.props.state.auth);
  }

  componentWillReceiveProps (newProps) {
    if(this.props != newProps) {
      this._setEditors(newProps.state.nannyEditor.editor);
    }
  }

  _setEditors(editor) {
    editor === 'configuration' 
    ? this.setState({ editors: {        
        nanny: true,
        transformer: true,
        preview: true}}) 
    : this.setState({ editors: {
        nanny: true,
        transformer: false,
        preview: false} });
  }
  
  _setTitle(e) {
    this.props.actions.app.setTitle(e.target.value);
  }

    _updateEditor (e, editor) {
    let newState = this.state.editors[editor]
      ? Object.assign({}, this.state.editors, {
        [editor]: false
      })
      : Object.assign({}, this.state.editors, {
        [editor]: true
      })
    this.setState({ editors: newState })
  }


  _visibleEditors () {
    var count = 0
    for (var k in this.state.editors) {
      if (this.state.editors[k] === true) {
        count++
      }
    }
    return count
  }

  render () {
    var width = 100 / this._visibleEditors()
    var widthProps = `${width}%`
    return (
      <div className='dashboardToolbar' style={{'width': '100%'}}>
        <NannyToolbar {...this.props}/>
        <Toolbar style={{'height': '35px'}}>
          <FlatButton label={`${this.props.state.nannyEditor.editor.capitalize()} Editor`} onTouchTap={(e) => this.updateEditor(e, 'nanny')} />
          { this.props.state.nannyEditor.editor == 'configuration' ? <FlatButton label='Transformer Editor' onTouchTap={(e) => this.updateEditor(e, 'transformer')} /> : null }
          <FlatButton label='Preview' onTouchTap={(e) => this.updateEditor(e, 'preview')} />
        </Toolbar>
        <TextField value={this.props.state.nannyEditor.title} hintText='Title' style={{'width': widthProps, 'paddingLeft':'16px'}} onChange={(e) => this.setTitle(e)} />
        <div className='dashboard'>
          {this.state.editors.nanny ?
             <NannyEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.transformer ?
              <TransformerEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.preview ?
               <PreviewEditor {...this.props} editorSize={widthProps} /> : null}
        </div>
          </div>)
  }
}


String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
} 

export default NannyDashboard
