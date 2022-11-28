import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './article.css';
import axios from "axios";
import Query from './Query';

function article() {

    var data;
    axios.get("http://localhost:3002/api/article")
        .then(function (response) {
            
            data=response.data[0].articleHeading;
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    return (

        <body>
            <div class='row'>
                <div class='col-sm-1'>
                    <Link activeClassName="activeItem" className="listItem" to="/article">  Articles  </Link>
                    <Link activeClassName="activeItem" className="listItem" to="/query">  Queries  </Link>
                </div>
                <div class='col-sm-11'>
                    <h3>This is article page</h3>
                    <h4>Latest articles:</h4>

                    <table>
                        <th>
                            {data}
                        </th>
                    </table>


                </div>
            </div>
            <footer class='footer navbar-fixed-bottom'>
                <div class='row'>
                    <div class='col-sm-4'>Developed by: Sankalp, Soumya, Pranavi, Shri Nagahari</div>
                    <div class='col-sm-4'></div>
                    <div class='col-sm-4'>KLE Technological University, Hubli - 580030</div>
                </div>

            </footer>
        </body >
    );
}
export default article;