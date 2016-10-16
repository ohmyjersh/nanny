import React, { Component } from 'react'
import ConfigEditor from '../ConfigEditor/ConfigEditor'
import PreviewEditor from '../PreviewEditor/PreviewEditor'
import TransformerEditor from '../TransformerEditor/TransformerEditor'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

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
        <Toolbar>
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
              <ConfigEditor {...this.props} editorSize={widthProps}/>
            </div> : null}
          {this.state.editors.transformer ? <div className='transformerEditor' style={{width:widthProps}}>
            <TransformerEditor {...this.props} editorSize={widthProps}/>
          </div> : null}
          {this.state.editors.preview ? <div className='previewEditor' style={{width:widthProps}}>
            <PreviewEditor {...this.props} editorSize={widthProps}/>
          </div> : null}
        </div>
      </div>)
  }
}

export default Dashboard
