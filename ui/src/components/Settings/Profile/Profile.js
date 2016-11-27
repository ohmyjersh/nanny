import React, { Component } from 'react'
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper';

export default class Profile extends Component {
  componentWillMount () {
    }

    setUpdateProfile() {

   }

   submitProfileChange() {

   }

   setUpdatePassword() {

   }

   resetSetPassword() {

   }

   submitPasswordChange() {
     
   }

  render() {
    return (<div>
      <UserProfile {...this.props} />
    </div>)
  }
}

const UserProfile = (props) => (
  <Card initiallyExpanded={true}>
    <CardHeader
      title='User Profile'
      subtitle={props.state.auth.username}
      actAsExpander={true}
      showExpandableButton={true}
      style={{ backgroundColor: 'rgb(232, 232, 232)' }}
      titleStyle={{ textAlign: 'center' }} />
    <Card expandable={true} style={{ width: '50%', textAlign: 'center', display: 'inline-block', }}>
      <TextField hintText='Current Password' floatingLabelText='Current Password' type='password' />
      <br />
      <TextField hintText='New Password' floatingLabelText='New Password' type='password' />
      <br />
      <TextField hintText='Confirm New Password' floatingLabelText='Confirm New Password' type='password' />
      <br />
      <CardActions>
        <FlatButton label='Clear' />
        <FlatButton label='Update' />
      </CardActions>
    </Card>
  </Card>
)
