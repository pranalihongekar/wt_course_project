import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';

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


    return (

        <body>
            <h2>This is Query page</h2>

            <div >
                <div>
                    Select categories
                </div>

                <div>
                    Post query
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