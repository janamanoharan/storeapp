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
            users: [],

        };

        this.goToProfile = this.goToProfile.bind(this);
        this.getStores = this.getStores.bind(this);
        this.getUsers = this.getUsers.bind(this);
        this.createStore = this.createStore.bind(this);        
        
    }

    createStore() {
        var storename = document.getElementById("newStorename").value;
        var category = document.getElementById("newCategory").value;
        var address = document.getElementById("newAddress").value;

        var t = this;
        if (storename.length == 0) {
            Materialize.toast("Enter a valid Store name")
        } else {
            fetch('/createStore', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    storename: storename,
                    category: category,
                    address: address,
                })
            })
            .then(json)
            .then(function(data) {
                console.log(data);
                if (data.status === 'error') {
                    Materialize.toast('Error occured', 3000);
                } else {
                    const newStore = data.data;
                    var stores = t.state.stores;
                    stores.push(newStore);
                    t.setState({
                        stores: stores
                    });
                }
            })
            .catch(function(err) {
                throw err;
            });
        }
    }

    getUsers() {
        var firstname = document.getElementById("searchfname").value;
        var lastname = document.getElementById("searchlname").value;
        var age = document.getElementById("searchage").value;
        var gender = document.getElementById("searchgender").value;

        var t = this;

        var query = "/getUsers?";
        if (firstname.length > 0) {
            query += "firstname=" + firstname + "&";            
        }
        if (lastname.length > 0) {
            query += "lastname=" + lastname + "&";            
        }
        if (age.length > 0) {
            query += "age=" + age + "&";            
        }
        if (gender.length > 0 && gender != "None") {
            query += "sex=" + gender + "&";            
        }
        query = query.slice(0, -1);

        // make the call
        console.log(query);
        fetch(query, { method: 'GET' })
            .then(json)
            .then(function(data) {
                // store this in the state courses to create course objects
                const users = data.data;
                t.setState({
                    users: users.map(function(user) {
                        return {username: user.username,
                            firstname: user.firstname,
                            lastname: user.lastname,
                            age: user.age,
                            sex: user.sex,
                            id: user._id
                        }
                    })
                });
            })
            .catch(function(err) {
                throw err;
            });
        
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
                            address: store.address,
                            id: store._id}
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
                                <Store key={store.id}
                                       id={store.id}
                                       storename={store.storename}
                                       category={store.category}
                                       address={store.address} />)}
                            <Collapsible >
                                <CollapsibleItem header={"Don't see the store you were looking for? Click to add"}>
                                    <Row s={12}>
                                        <Input id='newStorename' s={3} label="Store name"/>
                                        <Input id='newCategory' s={3} label="Category"/>
                                        <Input id='newAddress' s={3} label="Address"/>                                        
                                        <Button onClick={this.createStore} waves='light' type='submit'>Submit Store<Icon left>play_arrow</Icon></Button>                                             
                                    </Row>
                                </CollapsibleItem>
                            </Collapsible>
                        </Collection>
                    </CollapsibleItem>
                    <CollapsibleItem header='View Users' icon='assignment_ind'>
                        <h5 className="thin"> Search Users (Leave empty to get all users)</h5>
                        <Row s={12} >
                            <Input id='searchfname' s={3} label="First Name"><Icon>shopping_cart</Icon></Input>
                            <Input id='searchlname' s={3} label="Last Name"><Icon>subtitles</Icon></Input>
                            <Input id='searchage' s={2} label="Age"><Icon>subtitles</Icon></Input>
                            <Input id='searchgender' type='select' s={2} label="Gender">
                                <option value="None">None</option>                                
                                <option value="M">Male</option>
                                <option value="F">Female</option>                                
                            </Input>
                            
                            <Button onClick={this.getUsers} waves='light' type='submit'>Search<Icon left>play_arrow</Icon></Button>
                        </Row>
                        <Collection>
                            {this.state.users.map(user =>
                                <CollectionItem key={user.id}>{user.firstname} {user.lastname}, {user.username}</CollectionItem>)}
                        </Collection>

                    </CollapsibleItem>
                </Collapsible>
            </Row>
        );
    }
}