


const ApiKeys = (props) => (
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
        {props.state.profile.apiKeys.map(apiKey => <TableRow>
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