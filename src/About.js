import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter, useNavigate } from 'react-router-dom';
import axios from "axios";
import './Login.css';
import article from './article';

function About() {
    let navigate = useNavigate();

    const navigateToArticle = () => {
        navigate('/Article');
        navigate(0);
    };

    axios.get("http://localhost:3002/api/get")
        .then(function (response) {
            var loginStatus, USN, i, status = 0;

            for (i = 0; i < response.data.length; i++) {
                loginStatus = response.data[i].login_status;

                if(loginStatus == 1) {
                    USN = response.data[i].USN;
                    status = 1;
                }
            }

            if (status == 1) {
                alert("user already logged in." + USN);
                navigateToArticle();

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
            <div class='bg-color2' style={{ height: "80vh" }}>
                <div>
                    <br />
                    <h1>Welcome to the student disscussion forum</h1>
                    <br/><br/>
                    <div class='h4'>
                    <h2>About Kle TEch:</h2>
                    <br/>

                    KLE Technological University (KLE Tech) has its roots in B. V. Bhoomaraddi College of Engineering and Technology, Hubli (BVB), one of the premier engineering institutions of Karnataka. The founding organization KLE Society, Belgaum, established BVB college in 1947 with an aspiration of creating an institution that would lay the foundation of modern engineering education in northern region of Karnataka.
                    <br/><br/>
                    <h2>About The website:</h2>
                    <br/>
                    Community website for the students of kletech:
This is Student community website where students can pose their queries/ doubts 
and also can help other students with their doubts. This community web
site is curated to build a platform for knowledge sharing among peers,
provide organized information about development related doubts and most
importantly to create a healthy environment among students and thereby encouraging
them to excel in their domains.
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
        </body>

    );
}
export default About;