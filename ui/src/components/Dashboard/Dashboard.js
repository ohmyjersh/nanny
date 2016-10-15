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

  render() {
    return (
      <div className='toolbar'>
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
            <div className='configEditor'>
              <ConfigEditor {...this.props} />
            </div> : null}
          {this.state.editors.transformer ? <div className='transformerEditor'>
            <TransformerEditor {...this.props} />
          </div> : null}
          {this.state.editors.preview ? <div className='previewEditor'>
            <PreviewEditor {...this.props} />
          </div> : null}
        </div>
      </div>)
  }
}

export default Dashboard
