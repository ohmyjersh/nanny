import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import Dashboard from './Dashboard'
import Manifest from './Manifest';
import DashboardToolbar from './DashboardToolbar'
import TextField from 'material-ui/TextField';
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import ConfigEditor from '../ConfigEditor/ConfigEditor'
import PreviewEditor from '../PreviewEditor/PreviewEditor'
import TransformerEditor from '../TransformerEditor/TransformerEditor'

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
    this.props.actions.configuration.getConfigurations(this.props.state.auth)
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
        preview: true} });
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
    console.log(this.state.editors);
    var width = 100 / this._visibleEditors()
    var widthProps = `${width}%`
    return (
    <Tabs
        value={this.props.state.nannyEditor.editor}
        onChange={(value) => this.props.actions.nannyEditor.SetNannyEditor(value)}
      >
        <Tab label="Configuration Editor" value="configuration" >
      <div className='dashboardToolbar' style={{'width': '100%'}}>
        <DashboardToolbar {...this.props}/>
        <Toolbar style={{'height': '35px'}}>
          <FlatButton label={`${this.props.state.nannyEditor.editor.capitalize()} Editor`} onTouchTap={(e) => this.updateEditor(e, 'nanny')} />
          <FlatButton label='Transformer Editor' onTouchTap={(e) => this.updateEditor(e, 'transformer')} />
          <FlatButton label='Preview' onTouchTap={(e) => this.updateEditor(e, 'preview')} />
        </Toolbar>
        <TextField value={this.props.state.configEditor.title} hintText='Title' style={{'width': widthProps, 'paddingLeft':'16px'}} onChange={(e) => this.setTitle(e)} />
        <div className='dashboard'>
          {this.state.editors.nanny ?
             <ConfigEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.transformer ?
             <TransformerEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.preview ?
             <PreviewEditor {...this.props} editorSize={widthProps} /> : null}
        </div>
          </div>
        </Tab>
        <Tab label="Manfiest Editor" value="manifest">
      <div className='dashboardToolbar' style={{'width': '100%'}}>
        <DashboardToolbar {...this.props}/>
        <Toolbar style={{'height': '35px'}}>
          <FlatButton label={`${this.props.state.nannyEditor.editor.capitalize()} Editor`} onTouchTap={(e) => this.updateEditor(e, 'nanny')} />
          <FlatButton label='Preview' onTouchTap={(e) => this.updateEditor(e, 'preview')} />
        </Toolbar>
        <TextField value={this.props.state.configEditor.title} hintText='Title' style={{'width': widthProps, 'paddingLeft':'16px'}} onChange={(e) => this.setTitle(e)} />
        <div className='dashboard'>
          {this.state.editors.nanny ?
             <ConfigEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.transformer ?
             <TransformerEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.preview ?
             <PreviewEditor {...this.props} editorSize={widthProps} /> : null}
        </div>
          </div>
        </Tab>
      </Tabs>)
  }
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
} 

export default NannyDashboard
