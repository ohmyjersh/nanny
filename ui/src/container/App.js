import React, { Component } from 'react';
import {connect} from 'react-redux';
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
          rightButtons = <span><FlatButton label="Login" />/<FlatButton label="Signup" /></span>
      }
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">
        <AppBar
        iconElementRight={rightButtons}/>

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
  return {
    add:state.get('add'),
    ingredients:state.get('ingredients'),
    results:state.get('results'),
    page:state.get('page'),
    recipe:state.get('recipe'),
    error:state.get('error'),
    isFetching:state.get('isFetching')
  };
}

export default App
//export default App = connect(mapStateToProps, actions)(App);
