import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import './Register.css';

function Register() {
        function validate() {

            axios.get("http://localhost:3002/api/get")
                .then(function (response) {
                    var username, password, x, y, status, i;
    
                    x = document.getElementById('username').value;
                    y = document.getElementById('password').value;
    
                    for (i = 0; i < response.data.length; i++) {
                        username = response.data[i].username;
                        password = response.data[i].password;
    
                        if (x == username && y == password) {
                            status = 0;
                        }
    
                        else {
                            status = 1;
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
                <div class='bg-color2' style={{height:"100vh"}}>
                <div>
                    <br/>
                    <h1>Sign up:</h1>
                    <br/><br/>
                </div>
    
                <form class='register-form'>
                    <div className="form-group h4">
                        <label>Username: </label>
                        <input type='text' class="form-control" id='username' />
                        <br />
                        <label>Password: </label>
                        <input type='password' class="form-control"  id='password1' />
                        <br />
                        <label>Re enter Password: </label>
                        <input type='password' class="form-control"  id='password2' />
                        <br />
                        <label>Branch: </label>
                        <input type='password' class="form-control"  id='branch' />
                        <br />
                        <label>USN: </label>
                        <input type='password' class="form-control"  id='usn' />
                        <br /><br />
                        <input type='button' value='Signup' class='btn btn-default' onClick={validate} />
                    </div>
                </form>
                </div>
            </body>

    );
}
export default Register;