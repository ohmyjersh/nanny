import React, { Component } from 'react'
import { Card, CardHeader, CardActions } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

export default class Profile extends Component {
  componentWillMount () {
    }

  submitChangePassword() {
    this.props.actions.auth.submitPasswordChange(this.props.state.auth,this.props.state.profile.changePassword);
  }

    updateChangePassword(key,value){
      this.props.actions.profile.updateChangePassword({key:key,value:value});
   }
    handleInputChange(e) {
      this.updateChangePassword(e.target.id,e.target.value)
      //this.checkPasswordValid();
    }

  render() {
    return (<div>
  <Card initiallyExpanded={true}>
    <CardHeader
      title='User Profile'
      subtitle={this.props.state.auth.username}
      actAsExpander={true}
      showExpandableButton={true}
      style={{ backgroundColor: 'rgb(232, 232, 232)' }}
      titleStyle={{ textAlign: 'center' }} />
    <Card expandable={true} style={{ width: '50%', textAlign: 'center', display: 'inline-block', }}>
      <TextField id='oldPassword' value={this.props.state.profile.changePassword.oldPassword} hintText='Current Password' floatingLabelText='Current Password' type='password' onChange={(e) => this.handleInputChange(e)} />
      <br />
      <TextField id='newPassword' value={this.props.state.profile.changePassword.newPassword} hintText='New Password' floatingLabelText='New Password' type='password' onChange={(e) => this.handleInputChange(e)} />
      <br />
      <TextField id='confirmPassword' value={this.props.state.profile.changePassword.confirmPassword} hintText='Confirm New Password' floatingLabelText='Confirm New Password' type='password' onChange={(e) => this.handleInputChange(e)}/>
      <br />
      <CardActions>
        <FlatButton label='Clear' />
        <FlatButton label='Update' 
                primary={true}
                keyboardFocused={true}
                onTouchTap={(e) => this.submitChangePassword()} />
      </CardActions>
    </Card>
  </Card>
    </div>)
  }
}