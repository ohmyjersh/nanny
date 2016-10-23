import React from 'react'
import { mapEditorContent, initNewEditor } from '../Helpers/EditorHelper'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from 'material-ui/Toolbar'
import SelectField from 'material-ui/SelectField'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class DashboardToolbar extends React.Component {

  constructor (props) {
    super(props)
    var value = this.props.state.configEditor.selectedConfiguration ? this.props.state.configEditor.selectedConfiguration : 0
    this.state = {
      value: value
    }
    this.save = this._save.bind(this)
    this.clone = this._clone.bind(this)
    this.resetEditor = this._resetEditor.bind(this)
    this.delete = this._delete.bind(this)
    this.handleChange = this._handleChange;
  }

  _clone () {
    // set editor to curent raw and content but set selection to 0
  }

  _save () {
    if (this.props.state.configEditor.isValid) {
      console.log('valid')
      if (!this.props.state.configEditor.id) {
        this.props.actions.configuration.createConfiguration(this.props.state.auth, {
          title: this.props.state.configEditor.title,
          configuration: this.props.state.configEditor.textContent,
          raw: this.props.state.configEditor.rawContent
        })
      }else {
        this.props.actions.configuration.updateConfiguration(this.props.state.auth, {
          title: this.props.configEditor.title,
          configuration: this.props.configEditor.textContent,
          raw: this.props.configEditor.rawContent
        })
      }}else {
      console.log('not valid json, dont do it')
    }
  }

  _resetEditor () {
    initNewEditor(this.props.actions.app.setEditorContent)
    initNewEditor(this.props.actions.app.setTransformerContent)
    this.props.actions.app.setTitle('')
  }

  _delete () {
    this.props.actions.configuration.deleteConfiguration()
  }

  // set current selected configuration to reducer to set state of configuration
  _handleChange (event, index, value) {
    this.setState({value});
    if(value === 0) {
      return this._resetEditor();
    }
  }

  render () {
    var menuItems = this.props.state.configurations.map((configuration, index) => <MenuItem key={index + 1} value={index + 1} primaryText={configuration.title} />
    )
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton label='Clone' secondary={true} />
          <DropDownMenu value={this.state.value} onChange={(e, index, value) => this.handleChange(e, index, value)}>
            <MenuItem key={0} value={0} primaryText='New Configuration' />
            {menuItems}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton label='Reset' primary={false} onTouchTap={(e) => this.resetEditor()} />
          <RaisedButton label='Save' primary={true} onTouchTap={(e) => this.save()} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

var styles = {
  button: {
    // width:'50%',
    height: '50%'
  }
}

export default DashboardToolbar
