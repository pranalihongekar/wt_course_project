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
                    <br /><br />
                    <div class='h4'>KLE’s BVB, Emerges as ‘KLE Technological University’

                        KLE Technological University (KLE Tech) has its roots in one of the premier engineering institutions of Karnataka, B. V. Bhoomaraddi College of Engineering and Technology (BVB), a prestigious engineering college in Hubli. The founding organization KLE Society, Belgaum, established BVB college in 1947 with an aspiration of creating an institution that would lay the foundation of modern engineering education in northern region of Karnataka. Over the years, it evolved to reach and hold a unique position of pride in the technical education system of India. As we entered into the 21st century, the college undertook comprehensive reform process to adapt to the challenging global engineering education scenario. In pursuit of academic excellence, the college attained academic autonomy from University Grant Commission (UGC) in the year 2007. As an autonomous the college, BVB established its distinctive character in the academic space through its curriculum and outstanding student experience.

                        Over the time it gained tremendous credibility with the industries and employers and emerged as a brand to reckon with.  The Alumni of the Institute have done exceedingly well in all spheres of life at both national and international levels and brought name and fame for themselves as well as to their Alma Mater.

                        The times have changed, and the higher educational institutions need to continually innovate to maintain and enhance their relevance to meet the ever changing demands of global economies. Apart from delivering good quality education, the institutions are expected to develop their capacity in research and innovation. They also need to undergo a fundamental transformation in terms of their role in the society, mode of operation, and economic structure and the scale at which they operate.

                        Keeping the above challenges in mind BVB College of Engineering and Technology undertook strategic initiative of transforming itself into a University of national distinction. In 2014 the college was recognized as a state private University by Government of Karnataka. The rich heritage of BVB College as one of the best engineering college in Hubli combined with brand equity of KLE Society are the starting points for KLE Technological University to emerge as a University with a national distinction.
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