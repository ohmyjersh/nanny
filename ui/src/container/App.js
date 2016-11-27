import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Actions from '../actions/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import Dashboard from 'material-ui/svg-icons/action/dashboard';
import Login from '../components/auth/login';

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
    super(props);
    this.state = {
      popOpen:false
    }
  }

  dashboardTap = () => {
    browserHistory.push('/dashboard');
  }

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

  closeSnackbar = () => {
    this.props.actions.app.setError({message:'',open:false});
  };

  render () {
    let rightButtons
    if (this.props.state.auth.authenticated) {
      rightButtons = <span>
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
            <Link to='settings'><MenuItem primaryText="Settings" onTouchTap={this.handleRequestClose} /></Link>
            <MenuItem primaryText="Sign out" onTouchTap={(e) => this.props.actions.auth.logOut()} />
          </Menu>
        </Popover>
      </span>
    } else {
      // eslint-disable-next-line
        null;
        //    rightButtons =
        // <span>
        //   <Link to='registration'>
        //   <FlatButton label='Register' /></Link>
        // </span>
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='App'>        
        <Snackbar
          open={this.props.state.error.open}
          message={this.props.state.error.message}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
        />
          <AppBar 
          showMenuIconButton={this.props.state.auth.authenticated ? true : false}
          titleStyle={{textAlign: "center"}}
          title="nanny"
          iconElementLeft={this.props.state.auth.authenticated ? <IconButton onTouchTap={this.dashboardTap}><Dashboard /></IconButton> : null}
          iconElementRight={rightButtons} 
          style={{'width':'100%'}}/>
              { this.props.state.auth.authenticated ?
                   this.props.children && React.cloneElement(this.props.children, { ...this.props }) :
                   <Login {...this.props}/>
            }
        </div>
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps (state) {
  return { state: {
      transformerEditor: state.module.reducer.transformerEditor,
      configurations: state.module.configurations,
      manifests: state.module.manifests,
      profile: state.module.profile,
      isFetching: state.module.isFetching,
      auth: state.module.auth,
      error: state.module.reducer.error,
      nannyEditor: state.module.nannyEditor,
      users: state.module.users,
      apiKeys: state.module.apiKeys
    }
  }
}

function mapDispatchToProps(dispatch) {
    return  { actions: { 
      auth: bindActionCreators(Actions.Auth, dispatch),
      app: bindActionCreators(Actions.App, dispatch),
      configuration: bindActionCreators(Actions.Configuration, dispatch),
      manifest: bindActionCreators(Actions.Manifest, dispatch),
      nannyEditor: bindActionCreators(Actions.NannyEditor, dispatch),
      users: bindActionCreators(Actions.Users, dispatch),
      apiKeys: bindActionCreators(Actions.ApiKeys, dispatch),
      profile: bindActionCreators(Actions.Profile, dispatch)
    }
  }
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App)
