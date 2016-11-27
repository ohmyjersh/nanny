import React, { Component } from 'react'
import { Card, CardHeader } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import FlatButton from 'material-ui/FlatButton'

export default class ApiKeys extends Component {
  componentWillMount () {
    this.props.actions.apiKeys.getApiKeys(this.props.state.auth);
  }
    submit = () => {
        this.props.actions.apiKeys.GenerateApiKey(this.props.state.auth);
    }
  render () {
    return (<Card>
                <CardHeader>
                    <FlatButton label='Create New ApiKey' primary={true} onTouchTap={this.submit} />
                    {this.props.state.apiKeys.apiKey ? <p> {`New ApiKey created: ${this.props.state.apiKeys.apiKey} - write this down as it won't be shown again.`} </p> : null}
                </CardHeader>
              <Table multiSelectable={true}>
                <TableHeader>
                  <TableRow>
                    <TableHeaderColumn colSpan='3' tooltip='ApiKeys' style={{textAlign: 'center'}}>
                      ApiKeys
                    </TableHeaderColumn>
                  </TableRow>
                  <TableRow>
                    <TableHeaderColumn>
                      Id
                    </TableHeaderColumn>
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
                  {this.props.state.apiKeys.apiKeys.map(apiKey => 
                    <TableRow>
                          <TableRowColumn>
                            {[apiKey._id]}
                          </TableRowColumn>
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
            </Card>)
  }
}
