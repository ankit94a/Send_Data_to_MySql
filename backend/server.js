const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const mysql = require('mysql');
const { json } = require("body-parser");
 
const app = express();
 
app.use(cors());
// parse application/json
app.use(bodyParser.json());

//create database connection
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'chiku@123#',
    database: 'test'
  });
   
  //connect to database
  conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });

//add new user
app.post('/store-data',(req, res) => {
    
    let data = {username: req.body.username,
                email: req.body.email,
                password:req.body.password,
                confirm_password: req.body.confirm_password};
    let sql = "INSERT INTO users SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 404, "error": null, "response": results}));
      console.log("data :: " +req.body.name);
    });
  });

  //fetching single user data
  app.get('/data',(req,res) =>{
    let data1={user:req.body.user}
    let sql1 = "SELECT * FROM users Where username=?"
    let query1 = conn.query(sql1,data1,(err,results) =>{
        if(err) throw err;
        res.send(JSON.stringify({"status": 404, "error": null, "response": results}));
    })
  })

  app.get('/posts', (req, res) => {
    conn.query("SELECT * FROM 'users';", (err, results, fields) => {
      if(err) throw err;
      res.send(results);
    });
  });

   
  app.listen(3000, () => {
    console.log("Server running successfully on 3000");
  });