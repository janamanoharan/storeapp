import React, { Component } from 'react'; 
import { Navbar, NavItem } from 'react-materialize';

export default class App extends Component {
  constructor() {
    super();


  }
 
  render() {

    return (
        <Navbar style={this.props.style} brand='RestaurApp' left>
        </Navbar>
    );
  }
}



