import React, { Component } from 'react'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
// dialog => move to own file + bring in flat button
import Dialog from 'material-ui/Dialog';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open:false,
            email: '',
            password: '',
            confirmPassword: '',
            role:{value:0,text:'Basic'},
            error: '',
            valid: ''
        }
    }
    handleInputChange(e) {
        this.setState({
            [e.target.id]: e.target.value
        });
        this.checkPasswordValid();
    }
    checkPasswordValid() {
        if (this.state.password === this.state.confirmPassword) {
            this.setState({
                valid: true
            });
        }
        else {
            this.setState({
                valid: false,
                errorText: 'Passwords do not match'
            })
        }
    }
    submit() {
        this.props.actions.auth.register({
            username: this.state.email,
            password: this.state.password,
            role: this.state.role.text
        });
    }
  componentWillMount () {
    this.props.actions.users.getUsers(this.props.state.auth);
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  render () {

      console.log(this.props.state);
      const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (<Card>
              <CardHeader>
                <FlatButton label='Create New User' primary={true} onTouchTap={this.handleOpen}  />
              </CardHeader>
          <Dialog
            autoDetectWindowHeight={false}
            bodyStyle={{padding: 0}}
            style={{paddingTop: 0, height: '100vh'}}
            title="Dialog With Actions"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}>
            <TextField 
                value={this.state.email}
                id="email"
                hintText="Email"
                floatingLabelText="Enter email address"
                onChange={(e) => this.handleInputChange(e)}
            /><br/>
            <SelectField
              floatingLabelText="Role"
              value={this.state.value}
              onChange={this.handleChange}
            >
            <MenuItem value={0} primaryText="Basic" />
            <MenuItem value={1} primaryText="Admin" />
        </SelectField>
            <TextField
                value={this.state.password}
                id="password"
                type="password"
                hintText="Password"
                errorText={this.state.error}
                floatingLabelText="Enter Password"
                onChange={(e) => this.handleInputChange(e)}
            /><br />
            <TextField
                value={this.state.confirmPassword}
                id="confirmPassword"
                type="password"
                hintText="Verify Password"
                errorText={this.state.error}
                floatingLabelText="Verify Password"
                onChange={(e) => this.handleInputChange(e)}
            /><br />
        </Dialog>
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
                      {x._id}
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
