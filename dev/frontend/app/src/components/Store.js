import React, { Component } from 'react'; 
import { Col, Row, Input, Icon, Button, CollectionItem, Modal } from 'react-materialize';
import Rating from 'react-rating-system';

import Login from './Login'
import Register from './Register'


export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id: this.props.id,
        storename: this.props.storename,
        category: this.props.category,
        address: this.props.address,
        rating: 0
    };
  }

  render() {
      let head = this.state.storename + ", " + this.state.address;
      var style = {
          width: "5px",
          height: "5px"
      };

      return(
          
          <Modal header={ head }
                   trigger={
                            <CollectionItem>{ head }</CollectionItem>
                           }>
                  <h4 className="thin">Store Information</h4>
                  <p>Name: {this.state.storename}</p>
                  <p>Category: {this.state.category}</p>
                  <p>Name: {this.state.address}</p>
                  <p> Average Rating: </p>
                  <Rating style={style}
                    image="http://www.enzoferey.com/react-rating-system/star.png" bg="#333333" initialValue={7} numberStars={10}
                  />
                  <div className="modal-footer">
                  <Button id="button" className="modal-action modal-close waves-effect indigo darken-3 btn" >{this.state.prompt}</Button>
                  </div>
            </Modal> 
      )
  }
}
 
