import React, { Component } from 'react'; 
import { Col, Row, Input, Icon, Button } from 'react-materialize';
import { hashHistory } from 'react-router';
import 'whatwg-fetch';

let utils = require('../utils.js');
let json = utils.json;

export default class App extends Component {
  constructor() {
    super();

  }

  handleClick(e) {
      e.preventDefault();

    var usernameRegex = /^([A-Za-z0-9]{4,})$/;
    let uname = document.getElementById("uname").value;
    let unameValid = usernameRegex.test(uname);

    if (!unameValid) {
        Materialize.toast('Username has to be atleast 4 characters long', 2000);
    }
    // hook to backend
    if (unameValid) {
        fetch('/findUser?username=' + uname, { method: 'GET' })
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
 
  render() {
        var style = {
            paddingRight: '45%',
            marginBottom: '2%'
        }
        var style2 = {
            textAlign: 'center',
            margin: 'auto'
        }
        var buttonStyle = {marginLeft: "2%"}


    return (
        <Col s={6} style={style2}>
            <h3>Login</h3>
            <Row>
                <Input className='validate' id='uname' s={12} label="Username"><Icon>account_circle</Icon></Input>
                <Button className=' light blue darken-2' style={buttonStyle} waves='light' onClick={this.handleClick}type='submit'>Login<Icon left>play_arrow</Icon></Button>
            </Row>
        </Col>
    );
  }
}
