import React, { Component } from 'react'
import {Tabs, Tab} from 'material-ui/Tabs';
import Dashboard from './Dashboard'
import Manifest from './Manifest';
import DashboardToolbar from './DashboardToolbar'
import { Toolbar } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

class NannyDashboard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      editors: {}
    }
  }

  componentWillMount() {
    this._setEditors(this.props.state.nannyEditor.editor);
    //this.props.actions.configuration.getConfigurations(this.props.state.auth)
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
    <Tabs
        value={this.props.state.nannyEditor.editor}
        onChange={(value) => this.props.actions.nannyEditor.SetNannyEditor(value)}
      >
        <Tab label="Configuration Editor" value="configuration" >
      <div className='dashboardToolbar' style={{'width': '100%'}}>
        <DashboardToolbar {...this.props}/>
        <Toolbar style={{'height': '35px'}}>
          <FlatButton label='Configuration Editor' onTouchTap={(e) => this.updateEditor(e, 'configuration')} />
          <FlatButton label='Transformer Editor' onTouchTap={(e) => this.updateEditor(e, 'transformer')} />
          <FlatButton label='Preview' onTouchTap={(e) => this.updateEditor(e, 'preview')} />
        </Toolbar>
            <h2>{this.props.state.nannyEditor.editor}</h2>
          </div>
        </Tab>
        <Tab label="Manfiest Editor" value="manifest">
      <div className='dashboardToolbar' style={{'width': '100%'}}>
        <DashboardToolbar {...this.props}/>
        <Toolbar style={{'height': '35px'}}>
          <FlatButton label='Configuration Editor' onTouchTap={(e) => this.updateEditor(e, 'configuration')} />
          <FlatButton label='Preview' onTouchTap={(e) => this.updateEditor(e, 'preview')} />
        </Toolbar>
            <h2>{this.props.state.nannyEditor.editor}</h2>
          </div>
        </Tab>
      </Tabs>)
  }
}

export default NannyDashboard
