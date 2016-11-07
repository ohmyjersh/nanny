import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton'
export default class ApiKeys extends React.Component {
    constructor(props) {
        super(props);
    }
    componentWillMount (){
    }
    render() {
        return(<div><Card>
            <CardHeader>ApiKeys</CardHeader>
            <ul>
            {
                this.props.state.profile.apiKeys.map( key => {
                    return <li><span>{key.name}</span>
                              <span>{key.key}</span>
                              <FlatButton>Disable</FlatButton>
                            </li>
                })
            }
            </ul>
            <FlatButton>Generate New ApiKey</FlatButton>
        </Card></div>);
    }
}