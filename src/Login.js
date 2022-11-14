import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import './Login.css';

function Login() {

    function validate() {

        axios.get("http://localhost:3002/api/get")
            .then(function (response) {
                var username, password, x, y, status=1, i;

                x = document.getElementById('username').value;
                y = document.getElementById('password').value;

                for (i = 0; i < response.data.length; i++) {
                    username = response.data[i].username;
                    password = response.data[i].password;

                    if (x == username && y == password) {
                        status = 0;
                    }
                }

                if (status == 0) {
                    alert("Login successful.");
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
    return (
        <body>
            <div class='bg-color2' style={{height:"80vh",}}>
            <div>
                <br/>
                <h1>Login page:</h1>
                <br/><br/>
            </div>

            <form onSubmit={validate}>
                <div className="form-group h4">
                    <label>Username: </label>
                    <input type='text' class="form-control" id='username' required/>
                    <br />
                    <label>Password: </label>
                    <input type='password' class="form-control"  id='password' required/>
                    <br /><br />
                    <input type='submit' value='Login' class='btn btn-default'/>
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