const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const PORT = 3002;
app.use(cors());
app.use(express.json())

app.get("/api/get", (req, res) => {
    db.query("SELECT * FROM userDetails", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.get("/api/article", (req, res) => {
    db.query("SELECT * FROM article", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});


app.post("/api/post", (req, res) => {
    const usn = req.body.usn;
    const fname = req.body.fname;
    const lname = req.body.lname;
    const password = req.body.password;
    const branch = req.body.branch;
    const email = req.body.email;


    db.query("INSERT INTO userDetails (USN, fname, lname, password, branch, email) VALUES (?,?,?,?,?,?)", [usn, fname, lname, password, branch, email], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/login", (req, res) => {
    const usn = req.body.usn;

    db.query("update userDetails set login_status=1 where USN=?", [usn], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/logout",[], (req, res) => {

    db.query("update userDetails set login_status=0 where login_status=1", (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/publish", (req, res) => {
    const usn = req.body.usn;
    const articleHeading = req.body.articleHeading;
    const article = req.body.article;


    db.query("INSERT INTO article (articleHeading,article,user) VALUES (?,?,?)", [articleHeading,article,usn], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on `, PORT)
})