import './App.css';
import Button from 'react-bootstrap/Button'
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, Outlet } from 'react-router-dom';
import axios from "axios";

import About from './About';
import Login from './Login';
import Register from './Register';
import Query from './Query';

class App extends Component {
  render() {

    return (
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
        </head>

        <body>
          <div class='text-center bg-color'>
          <Router>
            <div class='row'>

              <div class='col-sm-3'>
                <img src={require('./kle_logo2.png')} class='logo'></img>
              </div>

              <div class='col-sm-6 h4'>
                <h1>Community Website For Students</h1>
              </div>
              
              <nav>
              <div class='col-sm-3 h4' id='links'>
                <br/><br/>
                {/* <Button href="">Link</Button> <Button type="submit">Button</Button */}
                <Link activeClassName="activeItem" className="listItem" to="/Login">  Login  </Link><t/>
                <Link activeClassName="activeItem" className="listItem" to="/Register">  Signup  </Link>
                <Link activeClassName="activeItem" className="listItem" to="/About">  About us  </Link>
              </div>
              </nav>
            </div>
            <Routes>
                  <Route exact path='/' element={< About />}></Route>
                  <Route exact path='/Login' element={< Login />}></Route>
                  <Route exact path='/about' element={< About />}></Route>
                  <Route exact path='/register' element={< Register />}></Route>
                  <Route exact path='/query' element={< Query />}></Route>
                </Routes>
            </Router>
            </div>
        </body>
      </html>
    );
  }
}

export default App;
