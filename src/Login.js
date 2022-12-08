import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';


function Login() {
    let navigate = useNavigate();

    const navigateToQuery = () => {
        navigate('/article');
        navigate(0);
    };


    function Validate() {
        var tempUsername;

        axios.get("http://localhost:3002/api/get")
            .then(function (response) {
                var loginStatus, USN, i, status = 0, status1 = 1;

                for (i = 0; i < response.data.length; i++) {
                    loginStatus = response.data[i].login_status;

                    if (loginStatus == 1) {
                        USN = response.data[i].USN;
                        status = 1;
                    }
                }

                if (status == 1) {
                    alert(USN+" user already logged in.");
                    navigateToQuery();
                }

                else {
                    axios.get("http://localhost:3002/api/get")
                        .then(function (response) {
                            var username, password, x, y, status = 1, i;

                            x = document.getElementById('username').value;
                            y = document.getElementById('password').value;

                            for (i = 0; i < response.data.length; i++) {
                                username = response.data[i].USN;
                                password = response.data[i].password;

                                if (x == username && y == password) {
                                    status1 = 0;
                                    tempUsername = username;
                                }
                            }

                            if (status1 == 0) {
                                alert("Login successful.");

                                axios.post("http://localhost:3002/api/login",
                                {
                                    usn: tempUsername
                                })
                                .then(function (response) {
                                })
                                .catch(function (error) {
                                    console.log(error);
                                });

                                navigateToQuery();
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
            <div class='bg-color2' style={{ height: "80vh", }}>
                <div>
                    <br />
                    <h1>Login page:</h1>
                    <br /><br />
                </div>

                <form onSubmit={Validate} class='form2'>
                    <div className="form-group h4">
                        <label>Username: </label>
                        <input type='text' class="form-control" id='username' required />
                        <br />
                        <label>Password: </label>
                        <input type='password' class="form-control" id='password' required />
                        <br /><br />
                        <input type='submit' value='Login' class='btn btn-default' id="submit"/>
                    </div>
                </form>

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
export default Login;