import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import CreateUser from './CreateUser';
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
// dialog => move to own file + bring in flat button
import Dialog from 'material-ui/Dialog';

export default class Users extends Component {
  componentWillMount () {
    this.props.actions.users.getUsers(this.props.state.auth);
  }

  render () {
    return (<Card>
              <CreateUser {...this.props}/>
              <Table multiSelectable={true}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn colSpan='3' tooltip='Users' style={{textAlign: 'center'}}>
                      Users
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn>
                      Id
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Username
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Role
                    </TableHeaderColumn>
                    <TableHeaderColumn>
                      Created
                    </TableHeaderColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                {this.props.state.users.users.map(x => 
               <TableRow>
                    <TableRowColumn>
                      {[x._id]}
                    </TableRowColumn>
                    <TableRowColumn>
                      {x.username}
                    </TableRowColumn>
                    <TableRowColumn>
                      {x.role}
                    </TableRowColumn>
                    <TableRowColumn>
                      {x.createdAt}
                    </TableRowColumn>
                  </TableRow>
                )}
                </TableBody>
              </Table>
            </Card>)
  }
}