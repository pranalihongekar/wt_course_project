import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './article.css';
import axios from "axios";
import Query from './Query';
import { tab } from '@testing-library/user-event/dist/tab';

function Article() {

    var i;
    axios.get("http://localhost:3002/api/article")
        .then(function (response) {
            console.log(response);
            
            // document.getElementById("articleHeading").innerHTML=response.data[0].articleHeading;
            // document.getElementById("article").innerHTML=response.data[0].article;
            var table = document.getElementById("table").getElementsByTagName('tbody')[0];
            for(i=0;i<response.data.length;i++)
            {
                var newrow = table.insertRow();
            var newcell = newrow.insertCell();
            newcell.append(response.data[i].articleHeading);
            var newrow = table.insertRow();
            var newcell2 = newrow.insertCell();
            newcell2.append(response.data[i].article);
            }
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

                    <table border='1' id='table'>
                        <tbody>
                        </tbody>
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
export default Article;