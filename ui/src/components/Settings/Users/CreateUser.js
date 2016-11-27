import React, { Component } from 'react'
import {CardHeader } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);
          this.state = {
                open:false
            }
    }

   updateCreatNew(key,value){
      this.props.actions.users.updateCreate({key:key,value:value});
   }
    handleInputChange(e) {
      this.updateCreatNew(e.target.id,e.target.value)
      this.checkPasswordValid();
    }
    checkPasswordValid() {
        if (this.props.state.users.createNew.password === this.props.state.users.createNew.confirmPassword) {
            this.updateCreatNew('valid',true);
            this.updateCreatNew('error','');
        }
        else {
            this.updateCreatNew('valid',false);
            this.updateCreatNew('error','Passwords do not match');
        }
    }
    submit() {
        this.props.actions.auth.register({
            username: this.props.state.users.createNew.email,
            password: this.props.state.users.createNew.password
        });
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
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
                onTouchTap={(e) => this.submit()}
                />,
        ];
        return (
            <div>
                <CardHeader>
                    <FlatButton label='Create New User' primary={true} onTouchTap={this.handleOpen} />
                </CardHeader>
                <Dialog
                    autoDetectWindowHeight={false}
                    bodyStyle={{ padding: 0 }}
                    style={{ paddingTop: 0, height: '100vh' }}
                    title="Create new nanny user"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}>
                    <TextField
                        value={this.props.state.users.createNew.email}
                        id="email"
                        hintText="Email"
                        floatingLabelText="Enter email address"
                        onChange={(e) => this.handleInputChange(e)}
                        /><br />
                    <TextField
                        value={this.props.state.users.createNew.password}
                        id="password"
                        ref="password"
                        type="password"
                        hintText="Password"
                        floatingLabelText="Enter Password"
                        onChange={(e) => this.handleInputChange(e)}
                        /><br />
                    <TextField
                        value={this.props.state.users.createNew.confirmPassword}
                        id="confirmPassword"
                        type="password"
                        hintText="Verify Password"
                        floatingLabelText="Verify Password"
                        onChange={(e) => this.handleInputChange(e)}
                        /><br />
                    {!this.props.state.users.createNew.valid ? <p style={{
                        'justifyContent': 'center',
                        'alignItems': 'center', 'textAlign': 'center', 'color': 'red'
                    }}>Passwords do not match</p> : null}
                </Dialog>
            </div>
        );
    }
}