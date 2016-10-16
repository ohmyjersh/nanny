import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FlatButton from 'material-ui/FlatButton'

export default class EditorToolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}