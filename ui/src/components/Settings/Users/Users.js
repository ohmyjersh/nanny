import React, { Component } from 'react'
import { Card } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import CreateUser from './CreateUser';

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
                    <TableHeaderColumn colSpan='3' tooltip='Users' style={{teusertAlign: 'center'}}>
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
                {this.props.state.users.users.map(user => 
                    <TableRow>
                          <TableRowColumn>
                            {[user._id]}
                          </TableRowColumn>
                          <TableRowColumn>
                            {user.username}
                          </TableRowColumn>
                          <TableRowColumn>
                            {user.role}
                          </TableRowColumn>
                          <TableRowColumn>
                            {user.createdAt}
                          </TableRowColumn>
                        </TableRow>
                    )}
                </TableBody>
              </Table>
            </Card>)
  }
}