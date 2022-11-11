import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Homepage from './pages/Homepage';

class App extends Component {
  render() {
    return (
      <body class='first_page'>

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

        <Router>
          <div className="App">
            <ul className="App-header">
              <li>
                <Link to="/Homepage">Homepage</Link>
              </li>
            </ul>
            <Routes>
              <Route exact path='/Homepage' element={< Homepage />}></Route>
            </Routes>
          </div>
         </Router>

      </body>
    );
  }
}

export default App;
