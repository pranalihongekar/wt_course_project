import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Admin.css';

function Admin() {
    let navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
        navigate(0);
    };

    axios.get("http://localhost:3002/api/get")
        .then(function (response) {
            var loginStatus, USN, i, status = 0, admin = 0, is_admin;

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

    var tempUSN;
    var tempqId;
    var temparticleId ;

    axios.get("http://localhost:3002/api/get")
        .then(function (response) {
            console.log(response);

            var table = document.getElementById("table").getElementsByTagName('tbody')[0];
            var i;
            for (i = response.data.length - 1; i >= 0; i--) {
                var newrow = table.insertRow();
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].USN);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].fname);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].lname);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].branch);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].email);
                var newcell = newrow.insertCell();
                var tBox = document.createElement('input');
                tBox.setAttribute('type', 'submit');
                tBox.setAttribute('value', response.data[i].USN);
                tBox.setAttribute('id', 'removeUser');
                newcell.append(tBox);
            }

            tempUSN = document.getElementById('removeUser').value;
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });



    function RemoveUser() {


        alert(tempUSN);
        axios.post("http://localhost:3002/api/removeUser",
            {
                usn: tempUSN
            })
            .then(function (response) {
                alert("User Removed");
            })
            .catch(function (error) {
                alert("Error. try again.");
                console.log(error);
            });
    }

    function DeleteQuestion()
    {
        axios.post("http://localhost:3002/api/deleteQuestion",
            {
                qId:document.getElementById('qId').value
            })
            .then(function (response) {
                alert("Question Removed");
            })
            .catch(function (error) {
                alert("Error. try again.");
                console.log(error);
            });
    }

    function DeleteArticle()
    {
        axios.post("http://localhost:3002/api/deleteArticle",
            {
                articleId:document.getElementById('articleId').value
            })
            .then(function (response) {
                alert("Article Removed");
            })
            .catch(function (error) {
                console.log(error);
                alert("Error. try again.");
            });
    }

    return (
        <body>
            <div class='row'>
                <div class='col-sm-1'>
                    <br />
                    <Link activeClassName="activeItem" className="listItem" to="/article">Articles</Link><br /><br />
                    <Link activeClassName="activeItem" className="listItem" to="/query">Queries</Link><br /><br />
                    <Link activeClassName="activeItem" className="listItem" id="admin" to="/admin">  Admin page </Link><br /><br />
                    <form onSubmit={Logout}><input type='submit' value='Logout' /></form>
                </div>
                <div class='col-sm-11'>
                    <div>
                        <h4>List of registered users:</h4><br />
                        <form onSubmit={RemoveUser}>
                            <table border='1' id='table'>
                                <th>USN</th>
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Branch</th>
                                <th>Email</th>
                                <th>Remove user</th>
                                <tbody>
                                </tbody>
                            </table>
                        </form>
                    </div>

                    <h4>Delete article:</h4>
                    <form onSubmit={DeleteArticle}>
                        <input type='text' id='articleId' placeholder='Enter article Id' required />
                        <input type='submit' id='submit' value='delete' />
                    </form>

                    <h4>Delete Question:</h4>
                    <form onSubmit={DeleteQuestion}>
                        <input type='text' id='qId' placeholder='Enter Question Id' required />
                        <input type='submit' id='submit' value='delete' />
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

        </body>
    );
}
export default Admin;