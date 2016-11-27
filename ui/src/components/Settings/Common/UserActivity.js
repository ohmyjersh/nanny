const UserActivity = (props) => (
  <Card initiallyExpanded={true}>
    <CardHeader
      title='User Activity'
      actAsExpander={true}
      showExpandableButton={true}
      style={{ backgroundColor: 'rgb(232, 232, 232)' }}
      titleStyle={{ textAlign: 'center' }} />
    <CardHeader expandable={true}>
        <FlatButton label='Create New ApiKey' primary={true} onTouchTap={this.submit} />
        {this.props.state.apiKeys.apiKey ? <p> {`New ApiKey created: ${this.props.state.apiKeys.apiKey} - write this down as it won't be shown again.`} </p> : null}
    </CardHeader>
    <Table>
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
