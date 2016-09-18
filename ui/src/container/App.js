import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';

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
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="App">

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
