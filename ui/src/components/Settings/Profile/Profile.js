import React, { Component } from 'react'
import { Card, CardHeader, CardActions, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper';

export default class Profile extends Component {
  componentWillMount() {

   }

   setUpdatePassword() {

   }

   resetSetPassword() {

   }

   submitPasswordChange() {
     
   }

  render() {
    console.log(this.props.state)
    return (<div>
      <UserProfile {...this.props} />
      <UserApiKeys {...this.props} />
      <UserActivity {...this.props} />
    </div>)
  }
}

const UserApiKeys = (props) => (
  <Card initiallyExpanded={true}>
    <CardHeader
      title='ApiKey Management'
      actAsExpander={true}
      showExpandableButton={true}
      style={{ backgroundColor: 'rgb(232, 232, 232)' }}
      titleStyle={{ textAlign: 'center' }} />
    <Table multiSelectable={true} expandable={true}>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn colSpan='3' tooltip='ApiKeys' style={{ textAlign: 'center' }}>
            ApiKeys
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>
            ApiKey
          </TableHeaderColumn>
          <TableHeaderColumn>
            Status
          </TableHeaderColumn>
          <TableHeaderColumn>
            Created
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.state.apiKeys.apiKeys.map(apiKey => <TableRow>
          <TableRowColumn>
            {apiKey.apiKey}
          </TableRowColumn>
          <TableRowColumn>
            {apiKey.status}
          </TableRowColumn>
          <TableRowColumn>
            {apiKey.createdAt}
          </TableRowColumn>
        </TableRow>
        )}
      </TableBody>
    </Table>
  </Card>
)

const UserActivity = (props) => (
  <Card initiallyExpanded={true}>
    <CardHeader
      title='User Activity'
      actAsExpander={true}
      showExpandableButton={true}
      style={{ backgroundColor: 'rgb(232, 232, 232)' }}
      titleStyle={{ textAlign: 'center' }} />
    <Table expandable={true}>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn colSpan='3' tooltip=' User Activity' style={{ textAlign: 'center' }}>
            User Activity
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn>
            Type
          </TableHeaderColumn>
          <TableHeaderColumn>
            Info
          </TableHeaderColumn>
          <TableHeaderColumn>
            Created
          </TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableRowColumn>
            1234
          </TableRowColumn>
          <TableRowColumn>
            Create ApiKey
          </TableRowColumn>
          <TableRowColumn>
            Create a new ApiKey
          </TableRowColumn>
          <TableRowColumn>
            11-12-2014
          </TableRowColumn>
        </TableRow>
      </TableBody>
    </Table>
  </Card>
)

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
