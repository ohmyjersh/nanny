import React, { Component } from 'react';
import Card from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'

class Login extends Component {
 constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
            email:'',
            password:'',
        }
    }
    handleInputChange(e){
        this.setState({
            [e.target.id]:e.target.value
        });
    }
    submit(){
            this.props.actions.auth.login({
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
            <FlatButton style={{float:'right'}} label="Login" onClick={(e) => this.submit()} primary={true} />
        </Card>);
    }
}

export default Login;