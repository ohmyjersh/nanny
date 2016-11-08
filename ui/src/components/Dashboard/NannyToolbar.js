import React from 'react'
import { mapEditorContent, initNewEditor } from '../Helpers/EditorHelper'
import RaisedButton from 'material-ui/RaisedButton'
import { Toolbar, ToolbarGroup, ToolbarSeparator } from 'material-ui/Toolbar'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'


class NannyToolbar extends React.Component {

  constructor (props) {
    super(props)
    var configurationValue = this.props.state.nannyEditor.editor ===  'configuration' ? this.props.state.nannyEditor.currentSelection : -1;
    var manifestValue = this.props.state.nannyEditor.editor ===  'manifest' ? this.props.state.nannyEditor.currentSelection : -1;
    this.state = {
      configurationValue:configurationValue,
      manifestValue:manifestValue
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
      }} else {
        this.props.actions.app.setError({message:'Not valid json', open:true});
    }
  }

  _resetEditor (editor) {
        initNewEditor(this.props.actions.nannyEditor.SetNannyEditor, editor);
        initNewEditor(this.props.actions.app.setTransformerContent);
        this.props.actions.app.setTitle('');
  }

  _delete () {
    this.props.actions.configuration.deleteConfiguration(this.props.state.auth, this.props.state.configEditor.id);
    initNewEditor(this.props.actions.app.setEditorContent);
    this.props.actions.app.setTitle('');
  }

  // set current selected configuration to reducer to set state of configuration
  _handleChange (event, index, value, editor) {

    if (value === -1) {
      return this._resetEditor(editor);
    }
    else {
      if(editor === 'configuration')
      {
        this.setState({configurationValue:value});
        this.props.actions.app.loadSelection(value, this.props.state.configurations);
      }
      if(editor === 'manifest')
      {
        this.setState({manifestValue:value});
        this.props.actions.app.loadSelection(value, this.props.state.manifests);
      }
    }
  }

  render () {
    var configurationItems = this.props.state.configurations.map((configuration, index) => 
          <MenuItem key={index} value={index} primaryText={configuration.title}/>
    );
    var manifestItems = this.props.state.manifests.map((manifest, index) => 
          <MenuItem key={index} value={index} primaryText={manifest.title}/>
    );
    return (
      <Toolbar>
        <ToolbarGroup>
          <DropDownMenu value={this.state.configurationValue} onChange={(e, index, value) => this.handleChange(e, index, value, 'configuration')}>
            <MenuItem key={-1} value={-1} primaryText='New Configuration' />
            {configurationItems}
          </DropDownMenu>
          <DropDownMenu value={this.state.manifestValue} onChange={(e, index, value) => this.handleChange(e, index, value, 'manifest')}>
            <MenuItem key={-1} value={-1} primaryText='New Manifest' />
            {manifestItems}
          </DropDownMenu>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <RaisedButton label='Delete' secondary={true} disabled={this.props.state.configEditor.id ? false : true } onTouchTap={(e) => this.delete()}/>
          <RaisedButton label='Clone' secondary={true} disabled={this.props.state.configEditor.id ? false : true } onTouchTap={(e) => this.clone()}/>
          <RaisedButton label='Reset' primary={false} disabled={this.props.state.configEditor.id || !this.props.state.configEditor.title ? true : false} onTouchTap={(e) => this.resetEditor()} />
          <RaisedButton label={this.props.state.configEditor.id ? 'Update' :'Save'} disabled={this.props.state.configEditor.title ? false : true} primary={true} onTouchTap={(e) => this.save()} />
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default NannyToolbar
