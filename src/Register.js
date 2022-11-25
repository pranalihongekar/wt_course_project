import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import axios from "axios";
import './Register.css';

function Register() {
    function validate() {

        var username, usn, fname, lname, password1, password2, branch, email, status, i;

        usn = document.getElementById('usn').value;
        password1 = document.getElementById('password1').value;
        password2 = document.getElementById('password2').value;
        fname = document.getElementById('fname').value;
        lname = document.getElementById('lname').value;
        branch = document.getElementById('branch').value;
        email = document.getElementById('email').value;


        if (password1 == password2) {
           
            axios.post("http://localhost:3002/api/post",
                {
                    usn:usn,
                    fname:fname,
                    lname:lname,
                    password:password1,
                    branch:branch,
                    email: email
                })
                .then(function (response) {
                    alert("Registration successful");
                })
                .catch(function (error) {
                    alert("Registration failed. Check the credentials and try again.");
                    console.log(error);
                });



        }

        else {
            alert("Passwords do not match.");
        }

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
                        <label>USN: </label>
                        <input type='text' class="form-control" id='usn' required />
                        {/* pattern="[A-Za-z]{3}" */}
                        <br />
                        <label>Password: </label>
                        <input type='password' class="form-control" id='password1' required />
                        <br />
                        <label>Re enter Password: </label>
                        <input type='password' class="form-control" id='password2' required />
                        <br />
                        <label>First name: </label>
                        <input type='text' class="form-control" id='fname' required />
                        <br />
                        <label>Last name: </label>
                        <input type='text' class="form-control" id='lname' required />
                        <br />
                        <label>Branch: </label>
                        <input type='text' class="form-control" id='branch' required />
                        <br />
                        <label>Email id: </label>
                        <input type='text' class="form-control" id='email' required />
                        <br /><br />
                        <input type='submit' value='Signup' class='btn btn-default' />
                        <br /><br /><br /><br /><br /><br />
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