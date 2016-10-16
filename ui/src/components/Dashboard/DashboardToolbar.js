import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class DashboardToolbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
            <SelectField value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="Never" />
            <MenuItem value={2} primaryText="Every Night" />
            <MenuItem value={3} primaryText="Weeknights" />
            <MenuItem value={4} primaryText="Weekends" />
            <MenuItem value={5} primaryText="Weekly" />
            </SelectField>
            <RaisedButton label="Clone" secondary={true} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
            <RaisedButton label="Reset" primary={false} />
            <RaisedButton label="Save" primary={true} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

export default DashboardToolbar;