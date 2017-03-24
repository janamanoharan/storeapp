import React, { Component } from "react";
import { Col, Row, Input, Icon, Button, Navbar, NavItem } from "react-materialize";
import { hashHistory } from 'react-router';
import 'whatwg-fetch';


let utils = require('../utils.js');
let json = utils.json;

export default class Profile extends Component {
    constructor(props) {
        super(props);

        const user = props.location.state.data;

        console.log(user);
        this.state = {
            id: user._id,
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            age: user.age,
            sex: user.sex,
        }

        this.goHome = this.goHome.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        
   }

    handleClick(e) {
        e.preventDefault();

        // validate
        var nameRegex = /^([A-Za-z]{1,})$/;
        var ageRegex = /^([0-9]{1,2})$/;

        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let age = document.getElementById("age").value;
        let gender = document.getElementById("gender").value;
        
        let fnameValid = nameRegex.test(fname);
        let lnameValid = nameRegex.test(lname);
        let ageValid = ageRegex.test(age);
        
        if (!(fnameValid && lnameValid)) {
            Materialize.toast('Enter a valid name', 2000);
        }
        if (!ageValid) {
            Materialize.toast('Enter a valid age', 2000);        
        }

        if (fnameValid && lnameValid && ageValid) {
            fetch('/updateUser?id=' + this.state.id, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    age: this.state.age,
                    sex: this.state.sex
                })
            })
            .then(json)
            .then(function(data) {
                if (data.status === "success") {
                    const user = data.data[0]; 
                    hashHistory.push({
                        pathname: `/home`,
                        state: { data: user }
                    })
                } else {
                    Materialize.toast('Your username does not match our records', 2000);
                }
            })
            .catch(function(err) {
                throw err;
            });
        }


    }

    handleDelete(e) {
        e.preventDefault();
       fetch('/deleteUser?username=' + this.state.username, { method: 'DELETE' })
            .then(json)
            .then(function(data) {
                const user = data.data[0]; 
                hashHistory.push({
                    pathname: `/`
                })
                
            })
            .catch(function(err) {
                throw err;
            });
    }
    goHome() {
    var user = {
        _id: this.state.id,
        username: this.state.username,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        age: this.state.age,
        sex: this.state.sex,
        
    };
    hashHistory.push({
        pathname: `/home`,
        state: { data: user} 
    });
}

    render() {
        var style = {
            textAlign: 'center',
            width: '70%',
            margin: 'auto',
            paddingTop: "1%"
        }
        var style2 ={
            backgroundColor: "#448aff",
            height: "130%"
        }
        var ageString = this.state.age.toString();
        return (
            <div style={style2}>
            <Row>
                <Navbar className=' thin blue darken-2' brand="Profile" right>
                        <NavItem onClick={this.goHome}>Home</NavItem>
                        <NavItem href='/'>Logout</NavItem>
                </Navbar>
                <div className="blue lighten-5 z-depth-5"style={style}>
                <Row >
                <h3>Your Profile</h3>
                <Input disabled className='validate' pattern='[a-zA-Z0-9].{4,}' id='uname' s={12} placeholder={this.state.username}></Input>
                <Input id='fname' className='validate' pattern='[a-zA-Z].{1,}' id='fname' s={12}  placeholder={this.state.firstname}></Input>
                <Input id='lname' className='validate' pattern='[a-zA-Z].{1,}' id='lname' s={12}  placeholder={this.state.lastname}></Input>
                <Input id='age' className='validate' pattern='[0-9].{1,2}' id='age' s={12} placeholder={ageString} ></Input>
                    <Input id='gender' s={12} type='select' label="Gender" defaultValue='M'>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                    </Input>
                <Button className=' light blue darken-2' onClick={this.handleClick} waves='light' type='submit'>Update Profile</Button>
                </Row>
                <Button className=' light blue darken-2'onClick={this.handleDelete} waves='light' type='submit'>Delete Account</Button>                
                </div>
            </Row>
            </div>
        )
    }

}