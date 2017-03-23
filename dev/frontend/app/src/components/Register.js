import React, { Component } from 'react'; 
import Navbar from './Navbar';
import { Col, Row, Input, Icon, Button } from 'react-materialize';


export default class App extends Component {
    constructor() {
        super();


    }

    handleClick(e) {
        e.preventDefault();

        var usernameRegex = /^([A-Za-z0-9]{4,})$/;
        var nameRegex = /^([A-Za-z]{1,})$/;
        var ageRegex = /^([0-9]{1,2})$/;

        let uname = document.getElementById("uname").value;
        let fname = document.getElementById("fname").value;
        let lname = document.getElementById("lname").value;
        let age = document.getElementById("age").value;
        

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
        if (!age) {
            Materialize.toast('Enter a valid age', 2000);        
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
                <h3>Join RestaurApp!</h3>
                <Row>
                    <Input className='validate' pattern='[a-zA-Z0-9].{4,}' id='uname' s={12} label="Username"><Icon>account_circle</Icon></Input>
                    <Input className='validate' pattern='[a-zA-Z].{1,}' id='fname' s={6} label="First Name"><Icon>stars</Icon></Input>
                    <Input className='validate' pattern='[a-zA-Z].{1,}' id='lname' s={6} label="Last Name"></Input>
                    <Input className='validate' pattern='[0-9].{1,2}' id='age' s={6} label="Age"><Icon>vpn_key</Icon></Input>
                    <Input s={6} type='select' label="Gender" defaultValue='M'>
                        <option value='M'>Male</option>
                        <option value='F'>Female</option>
                    </Input>
                    <Button style={buttonStyle} onClick={this.handleClick} waves='light' type='submit'>Register<Icon left>play_arrow</Icon></Button>
                </Row>
            </Col>
        );
    }
}
