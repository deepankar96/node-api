const mysql = require('mysql');
const express = require('express')
const bodyparser = require('body-parser');
const app = express()
 
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'college-system',
  multipleStatements: true
  });

  mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });

    //Create Data in the database
    app.get('/add/:email/:pass/:username',(req,res)=>{
      var sql = 'INSERT into user (email,password,username) values ?';
      var value = [req.params.email,req.params.pass,req.params.username];
      mysqlConnection.query(sql,[value], (err,rows) => {
      if(err) throw err;
      res.send(result.affectedRows);
    });}
  );

    //Recieve Data from the database
    app.get('/:id',(req,res)=>{
      var userId = req.params.id;
      var sql = 'SELECT * FROM user WHERE Id= ?';
        mysqlConnection.query(sql,[userId], (err,rows) => {
        if(err) throw err;
        res.send(rows);
      });
      }
    );

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}..`);
})
