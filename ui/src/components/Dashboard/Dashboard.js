import React, { Component } from 'react'
import ConfigEditor from '../ConfigEditor/ConfigEditor'
import PreviewEditor from '../PreviewEditor/PreviewEditor'
import TransformerEditor from '../TransformerEditor/TransformerEditor'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
import DashboardToolbar from './DashboardToolbar'
// import EditorToolbar from './EditorToolbar'

class Dashboard extends Component {
  constructor (props) {
    super(props)

    this.state = {
      editors: {
        configuration: true,
        transformer: true,
        preview: true
      }
    }
    this.updateEditor = this._updateEditor.bind(this);
    this.setTitle = this._setTitle.bind(this);
  }

  componentWillMount () {
    this.props.actions.configuration.getConfigurations(this.props.state.auth)
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
      if (this.state.editors[k] == true) {
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
        <DashboardToolbar {...this.props}/>
        <Toolbar style={{'height': '35px'}}>
          <FlatButton label='Configuration Editor' onTouchTap={(e) => this.updateEditor(e, 'configuration')} />
          <FlatButton label='Transformer Editor' onTouchTap={(e) => this.updateEditor(e, 'transformer')} />
          <FlatButton label='Preview' onTouchTap={(e) => this.updateEditor(e, 'preview')} />
        </Toolbar>
        <TextField value={this.props.state.configEditor.title} hintText='Title' style={{'width': widthProps, 'paddingLeft':'16px'}} onChange={(e) => this.setTitle(e)} />
        <div className='dashboard'>
          {this.state.editors.configuration ?
             <ConfigEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.transformer ?
             <TransformerEditor {...this.props} editorSize={widthProps} /> : null}
          {this.state.editors.preview ?
             <PreviewEditor {...this.props} editorSize={widthProps} /> : null}
        </div>
      </div>)
  }
}

export default Dashboard
