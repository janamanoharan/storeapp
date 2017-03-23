import React, { Component } from "react";
import { Row,
         Input,
         Icon,
         Button,
         Navbar,
         NavItem,
         Collapsible,
         CollapsibleItem,
         Collection,
         CollectionItem } from "react-materialize";
import { hashHistory } from 'react-router';
import Profile from './Profile';
import Store from './Store';

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
            id: user._id,
            stores: [],
            otherUsers: [],

        };

        this.goToProfile = this.goToProfile.bind(this);
        this.getStores = this.getStores.bind(this);
        
    }

    getStores() {
        var storename = document.getElementById("storename").value;
        var category = document.getElementById("category").value;
        var t = this;
        this.setState({
            firstname: "JANAN"
        });
        var query = "/getStores";
        if (storename.length > 0 && category.length > 0) {
            query += "?storename=" + storename + "&category=" + category;
        } else if (storename.length > 0) {
            query += "?storename=" + storename;
        } else if (category.length > 0) {
            query += "?category=" + category;
        }
        // make the call
        console.log(query);
        fetch(query, { method: 'GET' })
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const stores = data.data;
                t.setState({
                    stores: stores.map(function(store) {
                        return {storename: store.storename,
                            category: store.category,
                            address: store.address}
                    })
                });
            })
            .catch(function(err) {
                throw err;
            });
        
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
                <Collapsible popout>
                    <CollapsibleItem header='View Stores' icon='shopping_cart'>
                        <h5 className="thin"> Search Stores (Leave empty to get all stores)</h5>
                        <Row s={12} >
                            <Input id='storename' s={5} label="Store Name"><Icon>shopping_cart</Icon></Input>
                            <Input id='category' s={5} label="Category"><Icon>subtitles</Icon></Input>
                            <Button onClick={this.getStores} waves='light' type='submit'>Search<Icon left>play_arrow</Icon></Button>
                        </Row>
                        <Collection>
                            {this.state.stores.map(store =>
                                <Store>{store.storename}, {store.category}, {store.address}</Store>)}
                        </Collection>


                    </CollapsibleItem>
                    <CollapsibleItem header='View Users' icon='assignment_ind'>
                        Users
                    </CollapsibleItem>
                </Collapsible>
            </Row>
        );
    }
}