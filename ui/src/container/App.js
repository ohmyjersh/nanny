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
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';

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
    this.state = {drawerOpen: false, popOpen:false};
  }

  handleToggle = () => this.setState({drawerOpen: !this.state.open});

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      popOpen: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      popOpen: false,
    });
  };

  handleLogOut() {

  }

  closeSnackbar = () => {
    this.props.actions.app.setError({message:'', open:false});
  };

  render () {
    let rightButtons
    if (this.props.state.auth.authenticated) {
      rightButtons =       <span>
        <FlatButton
          onTouchTap={this.handleTouchTap}
          label="Logged In!"
        />
        <Popover
          open={this.state.popOpen}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'top'}}
          onRequestClose={this.handleRequestClose}>
          <Menu>
            <MenuItem primaryText="Profile" />
            <MenuItem primaryText="Sign out" onTouchTap={(e) => this.props.actions.auth.logOut()} />
          </Menu>
        </Popover>
      </span>
    } else {
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
        <Drawer docked={false} open={this.state.drawerOpen} onRequestChange={(open) => this.setState({drawerOpen:open})}>
        <Subheader>Dashboards</Subheader>
          <MenuItem>Configurations</MenuItem>
          <MenuItem>Manifests</MenuItem>
        </Drawer>
        <Snackbar
          open={this.props.state.error.open}
          message={this.props.state.error.message}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
        />
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
  return { state: {
      configEditor: state.module.configEditor,
      transformerEditor: state.module.transformerEditor,
      configurations: state.module.configurations,
      manifests: state.module.manifests,
      isFetching: state.module.isFetching,
      auth: state.module.auth,
      error: state.module.error
    }
  }
}

function mapDispatchToProps(dispatch) {
    return  { actions: { 
      auth: bindActionCreators(Actions.Auth, dispatch),
      app: bindActionCreators(Actions.App, dispatch),
      configuration: bindActionCreators(Actions.Configuration, dispatch),
      manifest: bindActionCreators(Actions.Manifest, dispatch)
    }
  }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
