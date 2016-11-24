import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'

export default class Profile extends Component {
  componentWillMount () {}
  render () {
    return (<div>
              <Card>
              <CardHeader>
                <TextField />
                <br />
                <TextField />
              </CardHeader>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderColumn colSpan='3' tooltip=' User Activity' style={{textAlign: 'center'}}>
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
            </div>)
  }
}
