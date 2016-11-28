import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Dashboard from 'material-ui/svg-icons/action/dashboard';

export default class NannyAppBar extends Component {
    constructor(props) {
        super(props);
      this.state = {
        popOpen:false
      }
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

  dashboardTap = () => {
    browserHistory.push('/dashboard');
  }

    render() 
    {    let rightButtons
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
          <MenuItem  primaryText="Settings" onTouchTap={this.handleRequestClose} containerElement={<Link to='settings'/>}/>
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
        return (<div><AppBar 
          showMenuIconButton={this.props.state.auth.authenticated ? true : false}
          titleStyle={{textAlign: "center"}}
          title="nanny"
          iconElementLeft={this.props.state.auth.authenticated ? <IconButton onTouchTap={this.dashboardTap}><Dashboard /></IconButton> : null}
          iconElementRight={rightButtons} 
          style={{'width':'100%'}}/></div>)
    }
}


// { this.props.state.auth.authenticated ?
//        this.props.children && React.cloneElement(this.props.children, { ...this.props }) :
//        <Login {...this.props}/> && this.props.children && React.cloneElement(this.props.children, { ...this.props })
// }
