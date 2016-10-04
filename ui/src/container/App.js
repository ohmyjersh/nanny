import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class App extends Component {
  constructor() {
    super();
  }
  render() {
      var loggedIn = false;
      let rightButtons;
      if(loggedIn) {
          rightButtons = <span>jjarmain@gmail.com</span>;
      }
      else {
          rightButtons = 
          <span>
          <Link to='login'>
            <FlatButton 
              label="Login" /></Link>
              /
            <Link to='registration'>
            <FlatButton 
              label='Register' /></Link>
          </span>
      }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
        <AppBar
        iconElementRight={rightButtons}/>
          {this.props.children}
      </div>
      </MuiThemeProvider>
    );
  }
}

var styles = {
  container: {
    'width': '650px',
    'margin': '0 auto'
  }
}

function mapStateToProps(state) {
  return state;
}

export default App = connect(mapStateToProps, actions)(App);
