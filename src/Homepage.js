import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Query from './Query';
import About from './About';

function Homepage() {
    return (

        <body>
            <h2>This is homepage</h2>


            <ul className="App-header">
                <li>
                    <Link to="/about">About us</Link>
                </li>
                <li>
                    <Link to="/Query">Query page</Link>
                </li>
            </ul>
            
            

        </body >
    );
}
export default Homepage;