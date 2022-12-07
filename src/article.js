import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './article.css';
import axios from "axios";
import Query from './Query';
import { tab } from '@testing-library/user-event/dist/tab';

function Article() {

    var i;
    var loginStatus, USN, i, status = 0;

    let navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
        navigate(0);
    };

    axios.get("http://localhost:3002/api/get")
        .then(function (response) {

            for (i = 0; i < response.data.length; i++) {
                loginStatus = response.data[i].login_status;

                if (loginStatus == 1) {
                    USN = response.data[i].USN;
                    status = 1;
                }
            }
            if (status == 0) {
                navigateToLogin();
                alert("Login to enter query page.");
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    axios.get("http://localhost:3002/api/article")
        .then(function (response) {
            console.log(response);

            // document.getElementById("articleHeading").innerHTML=response.data[0].articleHeading;
            // document.getElementById("article").innerHTML=response.data[0].article;
            var table = document.getElementById("table").getElementsByTagName('tbody')[0];
            
            for (i = response.data.length-1; i >= 0; i--) {
                var newrow = table.insertRow();
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].user);
                newcell.append(" - ");
                newcell.append(response.data[i].articleHeading);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].article);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    function Logout() {
        axios.post("http://localhost:3002/api/logout",
                {                    
                })
                .then(function (response) {
                    alert("Logout successful");
                    navigateToLogin();
                })
                .catch(function (error) {
                    alert("Try again.");
                    console.log(error);
                });
    }

    function Publish()
    {
        axios.post("http://localhost:3002/api/publish",
                {
                    articleHeading: document.getElementById('articleHeading').value,
                    article: document.getElementById('article').value,
                    usn:USN
                })
                .then(function (response) {
                    alert("Article added.");
                })
                .catch(function (error) {
                    alert("Error. try again.");
                    console.log(error);
                });
    }

    return (

        <body>
            {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"/>  */}
            <div class='row'>
                <div class='col-sm-1'>
                <br/>
                    <Link activeClassName="activeItem" className="listItem" to="/article">Articles</Link><br/><br/> 
                    <Link activeClassName="activeItem" className="listItem" to="/query">Queries</Link><br/>
                    <br/><br/>
                    <form onSubmit={Logout}><input type='submit' value='Logout' /></form>
                </div>
                <div class='col-sm-11'>
                    <h3>This is article page</h3>

                    <h4>Post an article:</h4>

                    <form onSubmit={Publish}>
                        <br/>
                        <textarea id="articleHeading" rows="1" cols="100" placeholder="Article Heading"></textarea><br/>
                        <textarea id="article" rows="4" cols="100" placeholder="Article"></textarea><br/><br/>
                        <input type='submit' value='Submit'/> 
                        <br/><br/>
                    </form>

                    <h4>Latest articles:</h4>

                    <table border='1' id='table' class="table table-dark">
                        <th>Title</th>
                        <th>Article</th>
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