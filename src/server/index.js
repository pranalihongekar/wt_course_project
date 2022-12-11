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

app.get("/api/displayQuestions", (req, res) => {
    db.query("SELECT * FROM questions", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.get("/api/displayAnswers", (req, res) => {
    db.query("SELECT * FROM answers", (err, result) => {
        if (err) {
            console.log(err)
        }
        res.send(result)
    });
});

app.get("/api/editArticle",(req, res) => {
    const articleId = req.body.articleId;
    const article = req.body.article;
    db.query("update article set article=(?) where articleId = (?)",[article,articleId], (err, result) => {
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
    const date = req.body.date;

    db.query("INSERT INTO article (articleHeading,article,user,date) VALUES (?,?,?,?)", [articleHeading,article,usn,date], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/removeUser", (req, res) => {
    const usn = req.body.usn;

    db.query("delete from userDetails where USN=(?)", [usn], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });

    db.query("delete from articles where user=(?)", [usn], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });

    db.query("delete from questions where user=(?)", [usn], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });

    db.query("delete from answers where user=(?)", [usn], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/question", (req, res) => {
    const question = req.body.question;
    const usn = req.body.usn;
    const date = req.body.date;
    const tag = req.body.tag;

    db.query("INSERT INTO questions (question,user,tagId,date) VALUES (?,?,?,?)", [question,usn,tag,date], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/answer", (req, res) => {
    const answer = req.body.answer;
    const usn = req.body.usn;
    const date = req.body.date;
    const qId = req.body.qId;

    db.query("INSERT INTO answers (user,answer,qId,date) VALUES (?,?,?,?)", [usn,answer,qId,date], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/deleteQuestion", (req, res) => {
    const qId = req.body.qId;

    db.query("delete from questions where qId = (?) ", [qId], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.post("/api/deleteArticle", (req, res) => {
    const articleId = req.body.articleId;

    db.query("delete from article where articleId = (?) ", [articleId], (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on `, PORT)
})