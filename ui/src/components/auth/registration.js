import React, { Component } from 'react';
import {Card} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

class Registration extends Component {
    constructor() {
        super();
        this.state = {
            identity:'',
            email:'',
            password:'',
            confirmPassword:'',
            error:'',
            valid:''
        }
    }
    handleInputChange(e){
        this.setState({
            [e.target.id]:e.target.value
        });
        this.checkPasswordValid(); 
    }
    clearAll() {
        this.setState({
            identity:'',
            email:'',
            password:'',
            confirmPassword:'',
            errorText: ''
        });
    }
    checkPasswordValid() {
        if(this.state.password === this.state.confirmPassword) {
            this.setState({
                valid:true
            });
        }
        else {
            this.setState({
                valid:false,
                errorText: 'Passwords do not match'
            })
        }
    }
    submit(){
        this.props.actions.auth.register({
                username:this.state.email,
                password:this.state.password
        });
    }
    
    render() {
        return(
        <Card style={{'display': 'flex',
            'justifyContent': 'center',
            'alignItems':'center', 
            'width':'50%', 'margin':'0 auto', 'marginTop':'30px'}}>
            <TextField
                value={this.state.identity}
                id="identity"
                hintText="Identity"
                floatingLabelText="Add company identity"
                onChange={(e) => this.handleInputChange(e)}
            /><br />
            <TextField 
                value={this.state.email}
                id="email"
                hintText="Email"
                floatingLabelText="Enter email address"
                onChange={(e) => this.handleInputChange(e)}
            /><br />
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
            {!this.state.valid ? <p style={{'justifyContent': 'center',
            'alignItems':'center', 'textAlign':'center', 'color':'red'}}>Passwords do not match</p>: null }
            <FlatButton label="Clear" onClick={(e) => this.clearAll()} primary={true} />
            <FlatButton label="Submit" onClick={(e) => this.submit()} primary={true} />
        </Card>);
    }
}

export default Registration;