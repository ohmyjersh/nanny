import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'

export default class ApiKeys extends Component {
  constructor (props) {
    super(props)
  }
  componentWillMount () {}
  render () {
    return (<Card>
              <CardHeader>
                <FlatButton label='Generate New ApiKey' primary={true} />
              </CardHeader>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn colSpan='3' tooltip='ApiKeys' style={{textAlign: 'center'}}>
                      ApiKeys
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn>
                      Title
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
                  <TableRow>
                    <TableRowColumn>
                      John Smith
                    </TableRowColumn>
                    <TableRowColumn>
                      Employed
                    </TableRowColumn>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>)
  }
}
