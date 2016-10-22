import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

class DashboardToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
    this.saveConfiguration = this._saveConfiguration.bind(this);
    this.resetEditor = this._resetEditor.bind(this);
    this.deleteConfiguration = this._deleteConfiguration.bind(this);
  }

  _saveConfiguration () {
    if(!this.props.state.editorState.selectedConfiguration) {
      this.props.actions.configuration.saveConfiguration({
    name: 'test',
    configuration: this.props.state.configEditor.rawText,
    raw: ''
      });
    }
    else {
      this.props.actions.configuration.updateConfiguration({
          name: 'test',
          configuration: this.props.state.configEditor.rawText,
          raw: ''
      });
    }

  }

  _resetEditor() {

  }

  _deleteConfiguration () {

  }

  // set current selected configuration to reducer to set state of configuration
  handleChange = (event, index, value) => this.setState({value});

  render() {
    var menuItems = this.props.state.configurations.map((configuration, index) =>
            <MenuItem key={index} value={index} primaryText={configuration.name} />
          );
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton label="Clone" secondary={true} />
          <DropDownMenu value={this.state.value} onChange={this.handleChange}>
            {menuItems}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
            <RaisedButton label="Reset" primary={false}  />
            <RaisedButton label="Save" primary={true} />
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