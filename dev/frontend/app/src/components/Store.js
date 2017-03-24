import React, { Component } from 'react'; 
import { Col,
         Row,
         Input,
         Icon,
         Button,
         Collection,
         CollectionItem,
         Modal,
         Collapsible,
         CollapsibleItem,
         ProgressBar } from 'react-materialize';

import Review from './Review'

let utils = require('../utils.js');
let json = utils.json;

export default class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
        id: this.props.id,
        storename: this.props.storename,
        category: this.props.category,
        address: this.props.address,
        rating: 0,
        reviews: [],
        viewingUser: this.props.userId
    };

    this.getReviews = this.getReviews.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.postReview = this.postReview.bind(this);
  }

  componentWillMount() {
      var t = this;
      var rating = 0;
      var count = 0;
      fetch('/getReviews?storeID=' + t.state.id, { method: 'GET' })
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const reviews = data.data;
                
                for (var i = 0; i < reviews.length; i++) {
                    rating += reviews[i].rating;
                    count++;
                }

                if (count != 0) {
                    rating = rating / count;
                }
                t.setState({
                    rating: parseFloat(Math.round(rating * 100) / 100).toFixed(2)
                })
            })
            .catch(function(err) {
                throw err;
        });

  }


  getReviews() {
      var t = this;
      fetch('/getReviews?storeID=' + t.state.id, { method: 'GET' })
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const reviews = data.data;
                t.setState({
                    reviews: reviews.map(function(review) {
                        return {userID: review.userID,
                            storeID: review.storeID,
                            comment: review.comment,
                            rating: review.rating}
                    })
                });
            })
            .catch(function(err) {
                throw err;
        });
  }

  postReview() {
    var comment = document.getElementById("comment").value;
    var rating = document.getElementById("rating").value;
    
    var t = this;
    fetch('/createReview', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            comment: comment,
            rating: rating,
            userID: t.state.viewingUser,
            storeID: t.state.id
        })
    })
    .then(json)
    .then(function(data) {
        if (data.status === 'error') {
            Materialize.toast('Error occured', 3000);
        } else {
            const newReview = data.data;
            var reviews = t.state.reviews;
            reviews.push(newReview);
            t.setState({
                reviews: reviews
            });
        }
    })
    .catch(function(err) {
        throw err;
    });
    
}

  render() {
      let head = this.state.storename + ", " + this.state.address;


      return(
          
          <Modal header={ head }
                   trigger={
                            <CollectionItem>{ head }</CollectionItem>
                           }>
                  <h4 className="thin">Store Information</h4>
                  <p>Name: {this.state.storename}</p>
                  <p>Category: {this.state.category}</p>
                  <p>Address: {this.state.address}</p>
                  <Row>
                    <p> Average Rating: {this.state.rating} / 10</p>
                    <Col s={12}>
                        <ProgressBar progress={this.state.rating * 10}/>
                    </Col>
                  </Row>
                  <Collapsible>
                    <CollapsibleItem header={"Leave a Review"}>
                        <h6 className="thin">Leave a Review!</h6>
                        <Row s={12} >
                            <Input id='comment' s={5} label="Comment"><Icon>mode_edit</Icon></Input>
                            <Input id='rating' s={5} type='select' label="Rating">
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </Input>
                            <Button onClick={this.postReview} waves='light' type='submit'>Post<Icon left>play_arrow</Icon></Button>
                        </Row>
                    </CollapsibleItem>
                    <CollapsibleItem onClick={this.getReviews} header={"Read Reviews"}>
                        <Collection>
                            {this.state.reviews.map(review =>
                                <Review key={review.id}
                                        userID={review.userID}
                                        comment={review.comment}
                                        rating={review.rating}/>

                                )}
                        </Collection>
                    </CollapsibleItem>
                    
                  </Collapsible>
            </Modal> 
      )
  }
}
 
