import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from "axios";

import Homepage from './Homepage';
import About from './About';
import Query from './Query';



class App extends Component {
  render() {

    function validate() {

      axios.get("http://localhost:3002/api/get")
        .then(function (response) {
          var username, password, x, y, status, i;

          x = document.getElementById('username').value;
          y = document.getElementById('password').value;

          for (i = 0; i < response.data.length; i++) 
          {
            username = response.data[i].username;
            password = response.data[i].password;

            if (x == username && y == password) {
              status = 0;
            }

            else {
              status = 1;
            }
          }

          if (status == 0) {
            alert("Login successful.");
          }

          else {
            alert("login failed. Invalid credentials.")
          }


        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });

    }

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
          <label>Username: </label><input type='text' class='text' id='username' />
          <br />
          <label>Password: </label><input type='password' class='text' id='password' />
          <br /><br />
          <input type='button' value='Login' class='button' onClick={validate} />
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
