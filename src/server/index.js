const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())

app.get("/api/get", (req,res)=>{
    db.query("SELECT * FROM login", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

app.post("/api/post", (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const branch = req.body.branch;
    const usn = req.body.usn;

    db.query("INSERT INTO login (username, password, branch, usn) VALUES (?,?,?,?)",[username,password,branch,usn], (err,result)=>{
    if(err) {
    console.log(err)
    } 
    console.log(result)
});   });

app.listen(PORT, ()=>{
    console.log(`Server is running on `,PORT)
})