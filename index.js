const mysql = require('mysql');
const express = require('express')
const bodyparser = require('body-parser');

const app = express()
 
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

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

  app.use((req,res,next)=>{
    res.setHeader(
        "Access-Control-Allow-Origin","*"
    );
    res.setHeader(
      "Access-Control-Allow-Header",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS"
    );
    next();
  })


    //Recieve Data from the database
    app.get('/posts',(req,res)=>{
      var sql = 'SELECT * FROM user';
        mysqlConnection.query(sql, (err,rows) => {
        if(err) throw err;
        res.send(rows);
      });
      }
    );
    app.get('/test',(req,res)=> {
      const email = req.body;
      console.log(email);
    });

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}..`);
})
