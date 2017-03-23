import React, { Component } from 'react'; 
import {
    Router,
    Route,
    Link,
    IndexRoute,
    hashHistory,
    browserHistory
} from 'react-router';

import Main from './Main';
import Home from './Home';
import Profile from './Profile';


export default class App extends Component {
  constructor() {
    super();

  }
 
  render() {

    return (
        <Router history={hashHistory}>
            <Route path='/' component={Main}/>
            <Route path='/home' component={Home}/>
            <Route path='/profile' component={Profile}/>
            
        </Router>
    );
  }
}
