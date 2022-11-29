import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Query.css';

function Query() {

    let navigate = useNavigate();

    const navigateToLogin = () => {
        navigate('/login');
        navigate(0);
    };

    axios.get("http://localhost:3002/api/get")
        .then(function (response) {
            var loginStatus, USN, i, status = 0;

            for (i = 0; i < response.data.length; i++) {
                loginStatus = response.data[i].login_status;

                if (loginStatus == 1) {
                    USN = response.data[i].USN;
                    status = 1;
                }
            }
            if(status==0)
            {
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

    return (

        <body>
            <div class='row'>
                <div class='col-sm-1'>
                    <Link activeClassName="activeItem" className="listItem" to="/article">  Articles  </Link>
                    <Link activeClassName="activeItem" className="listItem" to="/query">  Queries  </Link><br/><br/>
                    <form onSubmit={Logout}><input type='submit' value='Logout' /></form>
                </div>
                <div class='col-sm-11'>
                    Query page
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