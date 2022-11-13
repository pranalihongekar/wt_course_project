import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from "axios";

import Homepage from './Homepage';
import About from './About';
import Query from './Query';

class App extends Component {
  render() {
    return (
      <body>

        <div class='parent'>

          <div class='child1'>
            <img src={require('./kle_logo2.png')} class='logo'></img>
          </div>

          <div class='child2'>
            <h1>Community Website For Students</h1>
            <h1>Login page:</h1>
          </div>
        </div>

        <form>
          <label>Username: </label><input type='text' class='text' />
          <br />
          <label>Password: </label><input type='password' class='text' />
          <br /><br />
          <input type='button' value='Login' class='button' />
        </form>

        {/* <Router>
          <Link to="/Homepage">Homepage</Link>

          <Routes>
            <Route exact path='/Homepage' element={< Homepage />}></Route>
            <Route exact path='/about' element={< About />}></Route>
            <Route exact path='/query' element={< Query />}></Route>
          </Routes>
        </Router> */}

      </body>
    );
  }
}

export default App;
