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
import Profile from './Profile';


export default class App extends Component {
  constructor() {
    super();

  }
 
  render() {

    return (
        <Router history={hashHistory}>
            <Route path='/' component={Main}/>
            <Route path='/profile' component={Profile}/>
        </Router>
    );
  }
}
