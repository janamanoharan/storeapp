import React, { Component } from "react";
import { Row, Input, Icon, Button, Navbar, NavItem } from "react-materialize";
import { hashHistory } from 'react-router';
import Profile from './Profile';
import 'whatwg-fetch';


let utils = require('../utils.js');
let json = utils.json;

export default class Home extends Component {
    constructor(props) {
        super(props);

        const user = props.location.state.data;

        this.state = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            sex: user.sex,
            id: user._id
        }

        this.goToProfile = this.goToProfile.bind(this);
    }

    goToProfile() {
        var user = {
            _id: this.state.id,
            username: this.state.username,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            age: this.state.age,
            sex: this.state.sex,
            
        };
        hashHistory.push({
            pathname: `/profile`,
            state: { data: user} 
        });
    }
 
    render() {
        let brand = 'Welcome, ' + this.state.username + "!";
        return (
            <Row>
                <Navbar brand={ brand } right>
                    <NavItem onClick={this.goToProfile}>Profile</NavItem>
                    <NavItem href='/'>Logout</NavItem>
                </Navbar>
                <h1>{this.state.username},
                {this.state.firstname},
                 {this.state.lastname}, 
                 {this.state.age},
                  {this.state.sex},
                   {this.state.id}</h1>
            </Row>
        );
    }
}