import React, { Component } from 'react'
import ConfigEditor from '../ConfigEditor/ConfigEditor'
import PreviewEditor from '../PreviewEditor/PreviewEditor'
import TransformerEditor from '../TransformerEditor/TransformerEditor'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
// import DashboardToolbar from './DashboardToolbar';
// import EditorToolbar from './EditorToolbar';
import Subheader from 'material-ui/Subheader';

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editors: {
        configuration: true,
        transformer: true,
        preview: true
      }
    }
    this.updateEditor = this._updateEditor.bind(this);

  }

  _updateEditor(e, editor) {
    let newState = this.state.editors[editor]
      ? Object.assign({}, this.state.editors, {
        [editor]: false
      })
      : Object.assign({}, this.state.editors, {
        [editor]: true
      });
    this.setState({ editors: newState });
  }

  _visibleEditors() {
    var count = 0;
    for (var k in this.state.editors) {
        if (this.state.editors[k] == true) {
          count ++;
        }
    }
    return count;
  }

  render() {
    var width = 100 / this._visibleEditors();
    var widthProps = `${width}%`
    return (
      <div className='toolbar' style={{'width':'100%'}}>
        <Toolbar style={{'height':'35px'}}>
          <FlatButton label='Configuration Editor'
            onTouchTap={(e) => this.updateEditor(e, 'configuration')}
            />
          <FlatButton label='Transformer Editor'
            onTouchTap={(e) => this.updateEditor(e, 'transformer')}
            />
          <FlatButton label='Preview'
            onTouchTap={(e) => this.updateEditor(e, 'preview')}
            />
        </Toolbar>
        <div className='dashboard'>
          {this.state.editors.configuration ?
            <div className='configEditor' style={{width:widthProps}}>
              <Subheader>Configurations</Subheader>
              <ConfigEditor {...this.props} editorSize={widthProps}/>
            </div> : null}
          {this.state.editors.transformer ? <div className='transformerEditor' style={{width:widthProps}}>
            <Subheader>Transformer</Subheader>
            <TransformerEditor {...this.props} editorSize={widthProps}/>
          </div> : null}
          {this.state.editors.preview ? <div className='previewEditor' style={{width:widthProps}}>
            <Subheader>Preview</Subheader>
            <PreviewEditor {...this.props} editorSize={widthProps}/>
          </div> : null}
        </div>
      </div>)
  }
}

import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';




export default Dashboard
