import React, { Component } from 'react'; 
import { Col, Row, Input, Icon, Button } from 'react-materialize';
import { hashHistory } from 'react-router';
import Home from './Home';

let utils = require('../utils.js');
let json = utils.json;

export default class App extends Component {
    constructor() {
        super();


    }

    handleClick(e) {
        e.preventDefault();

        var usernameRegex = /^([A-Za-z0-9]{4,})$/;
        var nameRegex = /^([A-Za-z]{1,})$/;
        var ageRegex = /^([0-9]{1,2})$/;

        var uname = document.getElementById("username").value;
        console.log(uname);
        let fname = document.getElementById("fname").value;
        console.log(fname);
        
        let lname = document.getElementById("lname").value;
        let age = document.getElementById("age").value;
        let gender = document.getElementById("gender").value;
        console.log(lname);
        console.log(age);
        console.log(gender);
        console.log(uname.length);
        
        
        

        let unameValid = usernameRegex.test(uname);
        let fnameValid = nameRegex.test(fname);
        let lnameValid = nameRegex.test(lname);
        let ageValid = ageRegex.test(age);
        
        if (!unameValid) {
            Materialize.toast('Username has to be atleast 4 characters long', 2000);
        } 
        if (!(fname && lname)) {
            Materialize.toast('Enter a valid name', 2000);
        }
        if (!ageValid) {
            Materialize.toast('Enter a valid age', 2000);        
        }

        if (unameValid && fnameValid && ageValid) {
            fetch('/createUser', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: uname,
                    firstname: fname,
                    lastname: lname,
                    age: age,
                    sex: gender
                })
            })
            .then(json)
            .then(function(data) {
                console.log(data);
                if (data.status === 'error') {
                    Materialize.toast('Username is taken!', 3000);
                } else {
                    const newUser = data.data;
                    hashHistory.push({
                        pathname: `/home`,
                        state: {
                            data : newUser 
                        }
                    });
                }
            })
            .catch(function(err) {
                throw err;
            });
        }
    }

    render() {
            var style2 = {
                textAlign: 'center',
                margin: 'auto'
            }
            var buttonStyle = {marginLeft: "2%"}


        return (
            <Col s={5} style={style2}>
                <h3>Join ShopRates!</h3>
                <Row>
                    <Input className='validate' pattern='[a-zA-Z].{4,}' id='username' s={12} label="Username"><Icon>stars</Icon></Input>
                    <Input className='validate' pattern='[a-zA-Z].{1,}' id='fname' s={6} label="First Name"><Icon>stars</Icon></Input>
                    <Input className='validate' pattern='[a-zA-Z].{1,}' id='lname' s={6} label="Last Name"></Input>
                    <Input className='validate' pattern='[0-9].{1,2}' id='age' s={6} label="Age"><Icon>vpn_key</Icon></Input>
                    <Input s={6} type='select' label="Gender" id='gender' defaultValue='M'>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                    </Input>
                    <Button className=' light blue darken-2' style={buttonStyle} onClick={this.handleClick} waves='light' type='submit'>Register<Icon left>play_arrow</Icon></Button>
                </Row>
            </Col>
        );
    }
}
// <Input className='validate' pattern='[a-zA-Z0-9].{4,}' id='uname' s={12} label="Username">
                    