import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import Header from '../src/components/pages/header/Header'
import Login from '../src/components/pages/login/Login'
import Feed from '../src/components/pages/feed/Feed'
import Profile from '../src/components/pages/profile/Profile'
// import Explore from '../src/components/pages/explore/Explore'
import Friend from './components/pages/firiend/Friend'
import 'semantic-ui-css/semantic.min.css'
import './App.css';


function App() {

  return (
    <div className="App">
    <BrowserRouter>
    <div>
        <Route path="/" exact component={Login}/>
        <Route path="/user/:id" component={Header}/>
        <Route path="/user/:id/feed" exact component={Feed}/>
        <Route path="/user/:id/profile" exact component={Profile}/>
        <Route path="/user/:id/friend/:member" exact component={Friend}/>
    </div>
    </BrowserRouter>

</div>
  );
}

export default App;
