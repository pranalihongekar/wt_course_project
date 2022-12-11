import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Query.css';
import Admin from './Admin';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Query() {

    let navigate = useNavigate();
    var loginStatus, USN, i, status = 0, admin = 0, is_admin;

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

    function Ask() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        var fulldate = date + "-" + month + "-" + year;

        axios.post("http://localhost:3002/api/question",
            {
                question: document.getElementById('question').value,
                usn: USN,
                tag: "1",
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

    axios.get("http://localhost:3002/api/displayQuestions")
        .then(function (response) {
            console.log(response);

            // document.getElementById("articleHeading").innerHTML=response.data[0].articleHeading;
            // document.getElementById("article").innerHTML=response.data[0].article;
            var table = document.getElementById("table").getElementsByTagName('tbody')[0];

            for (i = response.data.length - 1; i >= 0; i--) {
                var newrow = table.insertRow();
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].qId);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].user);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].date);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].question);
                //var newcell = newrow.insertCell();
                // var tBox = document.createElement('input');
                // tBox.setAttribute('type', 'submit');
                // tBox.setAttribute('value', response.data[i].qId);
                // tBox.setAttribute('id', 'Answer');
                // newcell.append(tBox);
            }
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });

    function Answer() {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();

        var fulldate = date + "-" + month + "-" + year;

        axios.post("http://localhost:3002/api/answer",
            {
                answer: document.getElementById('answer').value,
                usn: USN,
                qId: document.getElementById('qId').value,
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

    axios.get("http://localhost:3002/api/displayAnswers")
        .then(function (response) {
            console.log(response);

            // document.getElementById("articleHeading").innerHTML=response.data[0].articleHeading;
            // document.getElementById("article").innerHTML=response.data[0].article;
            var table = document.getElementById("table2").getElementsByTagName('tbody')[0];

            for (i = response.data.length - 1; i >= 0; i--) {
                var newrow = table.insertRow();
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].aId);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].user);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].date);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].qId);
                var newcell = newrow.insertCell();
                newcell.append(response.data[i].answer);
                //var newcell = newrow.insertCell();
                // var tBox = document.createElement('input');
                // tBox.setAttribute('type', 'submit');
                // tBox.setAttribute('value', response.data[i].qId);
                // tBox.setAttribute('id', 'Answer');
                // newcell.append(tBox);
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
                    <br />
                    <Link activeClassName="activeItem" className="listItem" to="/article">  Articles  </Link><br /> <br />
                    <Link activeClassName="activeItem" className="listItem" to="/query">  Queries  </Link><br /><br />
                    <Link activeClassName="activeItem" className="listItem" id="admin" to="/admin">  Admin page </Link><br /><br />
                    <form onSubmit={Logout}><input type='submit' value='Logout' /></form>
                </div>
                <div class='col-sm-11'>
                    <div>
                        <h4>Queries:</h4>

                        <h4>Ask a question:</h4>

                        <form onSubmit={Ask}>
                            <textarea id="question" rows="1" cols="100" placeholder="Question" required></textarea><br />
                            <input type='submit' value='Submit' />
                        </form>

                        Questions:
                        <form onSubmit={Answer}>
                            <table border='1' id='table' class="table table-dark">
                                <th>Question Id</th>
                                <th>Username</th>
                                <th>Date asked</th>
                                <th>Question</th>
                                <tbody>
                                </tbody>
                            </table>
                        </form>

                    </div>

                    <div>
                        Answer:

                        <form onSubmit={Answer}>
                            <input type='text' id='qId' placeholder='Enter question id' />
                            <br />
                            <textarea id="answer" rows="4" cols="100" placeholder="Answer" required></textarea><br /><br />

                            <input type='submit' value='Answer' />
                        </form>
                    </div>

                    <div>
                        Answers:

                        <table border='1' id='table2' class="table table-dark">
                            <th>Answer Id</th>
                            <th>Username</th>
                            <th>Date answered</th>
                            <th>Question Id</th>
                            <th>Answer</th>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
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
export default Query;