import React from 'react'
import { mapEditorContent, initNewEditor } from '../Helpers/EditorHelper'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'

class DashboardToolbar extends React.Component {

  constructor (props) {
    super(props)
    var value = this.props.state.configEditor.selectedConfiguration ? this.props.state.configEditor.selectedConfiguration : -1
    this.state = {
      value: value
    }
    this.save = this._save.bind(this)
    this.clone = this._clone.bind(this)
    this.resetEditor = this._resetEditor.bind(this)
    this.delete = this._delete.bind(this)
    this.handleChange = this._handleChange
  }

  _clone () {
    if(this.props.state.configEditor.id) {
        this.props.actions.app.setEditorContent(mapEditorContent(
          this.props.state.configEditor.editorState,
          this.props.state.configEditor.rawContent,
          this.props.state.configEditor.textContent
        ));
    }
  }

  _save () {
    if (this.props.state.configEditor.isValid) {
      if (!this.props.state.configEditor.id) {
        this.props.actions.configuration.createConfiguration(this.props.state.auth, {
          title: this.props.state.configEditor.title,
          configuration: this.props.state.configEditor.textContent,
          raw: this.props.state.configEditor.rawContent
        })
      } else {
        this.props.actions.configuration.updateConfiguration(this.props.state.auth, {
          id:this.props.state.configEditor.id,
          title: this.props.state.configEditor.title,
          configuration: this.props.state.configEditor.textContent,
          raw: this.props.state.configEditor.rawContent
        })
      }}else {
      console.log('not valid json, dont do it')
    }
  }

  _resetEditor () {
        initNewEditor(this.props.actions.app.setEditorContent);
        initNewEditor(this.props.actions.app.setTransformerContent);
        this.props.actions.app.setTitle('');
  }

  _delete () {
    this.props.actions.configuration.deleteConfiguration();
  }

  // set current selected configuration to reducer to set state of configuration
  _handleChange (event, index, value) {
    this.setState({value})
    if (value === -1) {
      return this._resetEditor()
    }else {
      this.props.actions.app.loadSelection(value)
    }
  }

  render () {
    var menuItems = this.props.state.configurations.map((configuration, index) => <MenuItem key={index} value={index} primaryText={configuration.title} />
    )
    return (
      <Toolbar>
        <ToolbarGroup>
          <RaisedButton label='Clone' secondary={true} disabled={this.props.state.configEditor.id ? false : true } onTouchTap={(e) => this.clone()}/>
          <DropDownMenu value={this.state.value} onChange={(e, index, value) => this.handleChange(e, index, value)}>
            <MenuItem key={-1} value={-1} primaryText='New Configuration' />
            {menuItems}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton label='Reset' primary={false} disabled={this.props.state.configEditor.id ? true : false} onTouchTap={(e) => this.resetEditor()} />
          <RaisedButton label={this.props.state.configEditor.id ? 'Update' :'Save'} disabled={this.props.state.configEditor.title ? false : true} primary={true} onTouchTap={(e) => this.save()} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default DashboardToolbar
