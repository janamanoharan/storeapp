import React, { Component } from "react";
import { Row, Input, Icon, Button } from "react-materialize";
import { hashHistory } from 'react-router';
import 'whatwg-fetch';


let utils = require('../utils.js');
let json = utils.json;

export default class Profile extends Component {
    constructor(props) {
        super(props);

        const user = props.location.state.data;

        this.state = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            sex: user.sex,
            
        }

        // this.componentWillMount = this.componentWillMount.bind(this);
    }

 
 
    render() {
        return (
            <h1>{this.state.username}, {this.state.firstname}, {this.state.lastname}, {this.state.age}, {this.state.sex}</h1>
        );
    }
}