import React, {Component} from 'react';
import ApiKeys from './ApiKeys';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(<ApiKeys {...this.props}/>);
    }
}