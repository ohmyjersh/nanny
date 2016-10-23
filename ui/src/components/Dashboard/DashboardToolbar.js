import React from 'react';
import { mapEditorContent, initNewEditor } from '../Helpers/EditorHelper'
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class DashboardToolbar extends React.Component {

  constructor(props) {
    super(props);
    var value = this.props.state.configEditor.selectedConfiguration ? this.props.state.configEditor.selectedConfiguration : 0;
    this.state = {
      value: value
    };
    this.save = this._save.bind(this);
    this.clone = this._clone.bind(this);
    this.resetEditor = this._resetEditor.bind(this);
    this.delete = this._delete.bind(this);
  }
  
  _clone() {

  }

  _save() {
    if(!this.props.state.currentSelection) {
      this.props.actions.configuration.createConfiguration(this.props.state.auth, {
        title: 'test',
        configuration: 'this is a test',
        raw: 'test'
        });
    }
    else {
      this.props.actions.configuration.updateConfiguration(this.props.state.auth, {
        title: 'test',
        configuration: 'this is a test',
        raw: 'test'
      });
    }

  }

  _resetEditor() {
      initNewEditor(this.props.actions.app.setEditorContent);
      initNewEditor(this.props.actions.app.setTransformerContent);
      this.props.actions.app.setTitle('');
  }

  _delete() {
    this.props.actions.configuration.deleteConfiguration();
  }

  // set current selected configuration to reducer to set state of configuration
  handleChange = (event, index, value) => this.setState({value});

  render() {
    var menuItems = this.props.state.configurations.map((configuration, index) =>
            <MenuItem key={index+1 }value={index+1} primaryText={configuration.title} />
          );
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton label="Clone" secondary={true} />
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            <MenuItem key={0} value={0} primaryText="New Configuration" />
            {menuItems}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
            <RaisedButton label="Reset" primary={false} onTouchTap={(e) => this.resetEditor()} />
            <RaisedButton label="Save" primary={true} onTouchTap={(e) => this.save()}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

var styles = {
  button : {
    //width:'50%',
    height:'50%'
  }
}

export default DashboardToolbar;