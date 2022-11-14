import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import './Register.css';

function Register() {
    function validate() {
        
        var username, password, p,q,r,s, status, i;

        p = document.getElementById('username').value;
        q = document.getElementById('password1').value;
        r = document.getElementById('branch').value;
        s = document.getElementById('usn').value;

        axios.post("http://localhost:3002/api/post", 
        {
            username: p,
            password: q,
            branch: r,
            usn: s
        })
        .then(function (response) {
            alert(response);
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    return (
        <body>
            <div class='bg-color2' style={{ height: "80vh" }}>
                <div>
                    <br />
                    <h1>Sign up:</h1>
                    <br /><br />
                </div>

                <form class='register-form' onSubmit={validate}>
                    <div className="form-group h4">
                        <label>Username: </label>
                        <input type='text' class="form-control" id='username' required/> 
                        {/* pattern="[A-Za-z]{3}" */}
                        <br />
                        <label>Password: </label>
                        <input type='password' class="form-control" id='password1' required/>
                        <br />
                        <label>Re enter Password: </label>
                        <input type='password' class="form-control" id='password2' required/>
                        <br />
                        <label>Branch: </label>
                        <input type='text' class="form-control" id='branch' required/>
                        <br />
                        <label>USN: </label>
                        <input type='text' class="form-control" id='usn' required/>
                        <br /><br />
                        <input type='submit' value='Signup' class='btn btn-default' />
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
export default Register;