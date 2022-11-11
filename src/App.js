import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import React, { Component } from 'react';

import Homepage from './pages/Homepage';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
       <Router>
           <div className="App">
            <ul className="App-header">
              <li>
                <Link to="/Login">Login</Link>
              </li>
              <li>
                <Link to="/Homepage">Homepage</Link>
              </li>
            </ul>
           <Routes>
                 <Route exact path='/Login' element={< Login />}></Route>
                 <Route exact path='/Homepage' element={< Homepage />}></Route>
          </Routes>
          </div>
       </Router>
   );
  }
}
  
export default App;
