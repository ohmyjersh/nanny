import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Actions from '../actions/index';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { deepOrange500 } from 'material-ui/styles/colors';
import NannyAppBar from './NannyAppBar';
import Snackbar from 'material-ui/Snackbar';
import Login from '../components/auth/login';
import LinearProgress from 'material-ui/LinearProgress';

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
  closeSnackbar = () => {
    this.props.actions.app.setError({message:'',open:false});
  };

  render () {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='App'>        
        <Snackbar
          open={this.props.state.error.open}
          message={this.props.state.error.message}
          autoHideDuration={4000}
          onRequestClose={this.closeSnackbar}
        />
    <NannyAppBar {...this.props}/>
    {this.props.state.isFetching ? <LinearProgress mode="indeterminate" /> : null }
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