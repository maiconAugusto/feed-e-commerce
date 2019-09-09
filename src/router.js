import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import Home from './pages/home';
import Register from './pages/register';
import Donations from './pages/donations';
import Profile from './pages/profile'
import EditProfileUser from './pages/editProfileUser';

const Routers = ()=>(

        <Router>
            <Switch>
                <Route path="/login" exact component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/register" component={Register}/>
                <Route path="/donations/" component={Donations}/>
                <Route path="/profile/:id" component={Profile}/>
                <Route path="/editProfile/:id" component={EditProfileUser} />
            </Switch>
        </Router>
    ) 
export default Routers