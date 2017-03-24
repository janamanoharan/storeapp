import React, { Component } from 'react'; 
import { Col, Row, Input, Icon, Button, Navbar, NavItem } from 'react-materialize';

import Login from './Login'
import Register from './Register'


export default class App extends Component {
  constructor() {
    super();

  }
 
  render() {
        var style = {
            paddingRight: '45%',
            marginBottom: '2%',
            
        }
        var style2 = {
            //textAlign: 'center',
            height: '100%',
            backgroundColor:  "#448aff",
            margin: 'auto'
        }
        var buttonStyle = {marginLeft: "2%"}


    return (
        <Row>
            <Navbar className=' light blue darken-2' style={style} brand='ShopRates' left />
            <Login />
            <Register />
        </Row>

    );
  }
}
