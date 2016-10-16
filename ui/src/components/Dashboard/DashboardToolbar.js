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
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar style={{'zIndex': '1'}}>
        <ToolbarGroup firstChild={true} style={{'zIndex': '1'}}>
          <SelectField style={{'zIndex': '0'}} value={this.state.value} onChange={this.handleChange}>
            <MenuItem value={1} primaryText="All Broadcasts" style={{'zIndex': '1'}} />
            <MenuItem value={2} primaryText="All Voice"  style={{'zIndex': '1'}}/>
            <MenuItem value={3} primaryText="All Text" style={{'zIndex': '0'}}/>
            <MenuItem value={4} primaryText="Complete Voice"style={{'zIndex': '0'}} />
            <MenuItem value={5} primaryText="Complete Text" style={{'zIndex': '0'}}/>
            <MenuItem value={6} primaryText="Active Voice" style={{'zIndex': '0'}}/>
            <MenuItem value={7} primaryText="Active Text" style={{'zIndex': '0'}}/>
          </SelectField>
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