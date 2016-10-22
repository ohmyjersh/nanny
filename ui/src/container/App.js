import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Actions from '../actions/index';
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
  },
      zIndex: {
        popover: 5001,
        layer: 5000
    }
})


class App extends Component {
  constructor (props) {
    super(props)
    this.state = {open: false};
  }

  handleToggle = () => this.setState({open: !this.state.open});

  render () {
    let rightButtons
    if (this.props.state.auth.authenticated) {
      rightButtons = <span>Logged In!</span>
    }else {
      rightButtons =
        <span>
        <Link to='login'>
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
          onLeftIconButtonTouchTap={this.handleToggle}
          style={{'width':'100%'}}/>
              {this.props.children && React.cloneElement(this.props.children, { ...this.props })}
        </div>
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps (state) {
  console.log(state);
  return {state: {
      configEditor: state.module.configEditor,
      transformerEditor: state.module.transformerEditor,
      loadedConfiguration: state.module.loadedConfiguration,
      loadedManifest: state.module.loadedManifest,
      configurations: state.module.configurations,
      manifests: state.module.manifests,
      isFetching: state.module.isFetching,
      auth: state.module.auth
    }
  }
}

function mapDispatchToProps(dispatch) {
  {
    return  {actions: { 
      auth: bindActionCreators(Actions.Auth, dispatch),
      app: bindActionCreators(Actions.App, dispatch),
      configuration: bindActionCreators(Actions.Configuration, dispatch),
      manifest: bindActionCreators(Actions.Manifest, dispatch)
    }
  }
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(Object.assign({}, todoActionCreators, counterActionCreators), dispatch)
//   }
// }


export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
