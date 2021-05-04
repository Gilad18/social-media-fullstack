import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from '../components/pages/header/Header'
import Login from '../components/pages/login/Login'
import Feed from '../components/pages/feed/Feed'
import Profile from '../components/pages/profile/Profile'


function User() {

  return (
    <div className="App">
            <BrowserRouter>
            <div>
                <Route path="/" exact component={Login}/>
                <Route path="/user/:id" component={Header}/>
                <Route path="/user/:id/feed" exact component={Feed}/>
                <Route path="/user/:id/profile" exact component={Profile}/>
                {/* <Route path="/user/:id/friends" exact component={Friends}/> */}
            </div>
            </BrowserRouter>

    </div>
  );
}

export default User;
