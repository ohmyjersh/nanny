import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render () {
    var loggedIn = false
    let rightButtons
    if (loggedIn) {
      rightButtons = <span>jjarmain@gmail.com</span>
    }else {
      rightButtons =
        <span><Link to='login'>
          <FlatButton label='Login' />
          </Link>/<Link to='registration'>
          <FlatButton label='Register' /></Link>
        </span>
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='App'>        
        <Drawer open={this.state.open}>
          <MenuItem>Menu Item</MenuItem>
          <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
          <AppBar iconElementRight={rightButtons} 
          onLeftIconButtonTouchTap={this.handleToggle}/>
              {this.props.children && React.cloneElement(this.props.children, { ...this.props })}
        </div>
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps (state) {
  return {state: {
      configEditor: state.module.configEditor,
      transformerEditor: state.module.transformerEditor,
      loadedConfiguration: state.module.loadedConfiguration,
      loadedManifest: state.module.loadedManifest,
      configurations: state.module.configurations,
      manifests: state.module.manifests,
      isFetching: state.module.isFetching,
      token: state.module.token
    }
  }
}

export const AppContainer = connect(mapStateToProps, actions)(App)
