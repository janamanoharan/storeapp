import React, { Component } from 'react'; 
import { Col,
         Row,
         CollectionItem,
         ProgressBar } from 'react-materialize';

let utils = require('../utils.js');
let json = utils.json;

export default class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.key,
            userID: this.props.userID,
            comment: this.props.comment,
            rating: this.props.rating,
            user: ""
        }

        this.componentWillMount = this.componentWillMount.bind(this);
    }
    componentWillMount() {
    var t = this;
    fetch('/findUser?id=' + this.state.userID, { method: 'GET' })
        .then(json)
        .then(function(data) {
            if (data.status === "success") {

                const user = data.data[0]; 
                console.log(user.username);
                t.setState({
                    user: user.username
                });
            }
        })
        .catch(function(err) {
            throw err;
        });
    }
    
    render() {
        return (
            <CollectionItem key={this.state.id}>

                <p>{this.state.user} says: {this.state.comment}</p>
                <p>Rating: {this.state.rating} / 10</p>      
                <Row>
                    <Col s={12}>
                        <ProgressBar progress={this.state.rating * 10}/>
                    </Col>
                </Row>                              
            </CollectionItem>
        )
    }
}
