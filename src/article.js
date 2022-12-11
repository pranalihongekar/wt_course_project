import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, resolvePath } from 'react-router-dom';
import './article.css';
import axios from "axios";
import Query from './Query';
import { tab } from '@testing-library/user-event/dist/tab';

function Article() {

    var i;
    var loginStatus, USN, i, status = 0, admin = 0, is_admin;

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
                    is_admin = response.data[i].is_admin;
                }
                if (is_admin == 'yes' || is_admin == 'Yes') {
                    admin = 1;
                }
            }
            if (status == 0) {
                navigateToLogin();
                alert("Login to enter query page.");
            }
            if (admin == 1) {
                document.getElementById("admin").style.visibility = 'visible';
            }

            else {
                document.getElementById("admin").style.visibility = 'hidden';
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

            for (i = response.data.length - 1; i >= 0; i--) {
                var newrow = table.insertRow();
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].articleId);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].user);
                var newcell = newrow.insertCell();
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

    function Publish() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        var fulldate = date + "-" + month + "-" + year;
        var count = 1;

        axios.get("http://localhost:3002/api/article")
            .then(function (response) {
                for (i = 0; i < response.data.length; i++) {
                    if (USN == response.data[i].user && response.data[i].date == fulldate) {
                        count++;
                    }
                }
                if (count < 10) {
                    axios.post("http://localhost:3002/api/publish",
                        {
                            articleHeading: document.getElementById('articleHeading').value,
                            article: document.getElementById('article').value,
                            usn: USN,
                            date: fulldate
                        })
                        .then(function (response) {
                            alert("Article added.");
                        })
                        .catch(function (error) {
                            alert("Error. try again.");
                            console.log(error);
                        });
                }
                else {
                    alert("One user can only post 10 articles per day.")
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



    function editArticle() {
        var tempArticleId = document.getElementById('articleId').value;
        var tempArticle2 = document.getElementById('article2').value;
        axios.get("http://localhost:3002/api/editArticle",
            {


                articleId: tempArticleId,
                article: tempArticle2
            })
            .then(function (response) {
                alert("Article updated.");
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
            {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css"/>  */}
            <div class='row'>
                <div class='col-sm-1'>
                    <br />
                    <Link activeClassName="activeItem" className="listItem" to="/article">Articles</Link><br /><br />
                    <Link activeClassName="activeItem" className="listItem" to="/query">Queries</Link><br /><br />
                    <Link activeClassName="activeItem" className="listItem" id="admin" to="/admin">  Admin page </Link><br /><br />
                    <form onSubmit={Logout}><input type='submit' value='Logout' /></form>
                </div>
                <div class='col-sm-11'>
                    <h3>This is article page</h3>

                    <h4>Post an article:</h4>

                    <form onSubmit={Publish}>
                        <br />
                        <textarea id="articleHeading" rows="1" cols="100" placeholder="Article Heading" required></textarea><br />
                        <textarea id="article" rows="4" cols="100" placeholder="Article" required></textarea><br /><br />
                        <input type='submit' value='Submit' id='submit' />
                        <br /><br />
                    </form>

                    <h4>Latest articles:</h4>

                    <table border='1' id='table' class="table table-dark">
                        <th>Article id</th>
                        <th>Posted by</th>
                        <th>Title</th>
                        <th>Article</th>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                <div>
                    <h4>Edit article:</h4>
                    <h4>Enter article number:</h4>
                    <form onSubmit={editArticle}>
                        <input type='text' id='articleId' placeholder='Enter article id:' required />
                        <textarea id="article2" rows="4" cols="100" placeholder="Enter new content" required></textarea><br /><br />
                        <input type='submit' value='Edit' id='submit' />
                    </form>

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