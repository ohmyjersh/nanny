import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as actions from '../actions'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { deepOrange500 } from 'material-ui/styles/colors'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500
  }
})

class App extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    var loggedIn = false
    let rightButtons
    if (loggedIn) {
      rightButtons = <span>jjarmain@gmail.com</span>
    }else {
      rightButtons =
        <span><Link to='login'> <FlatButton label='Login' /> </Link> / <Link to='registration'> <FlatButton label='Register' /> </Link></span>
    }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className='App'>
          <AppBar iconElementRight={rightButtons} />
          {React.cloneElement(this.props.children, { ...this.props })}
        </div>
      </MuiThemeProvider>
    )
  }
}
function mapStateToProps (state) {
  return {state: {
      configEditor: state.module.configEditor,
      transformerEditor: state.module.transformerEditor
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  }
}

export const AppContainer = connect(mapStateToProps, actions)(App)
