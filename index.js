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
      "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
        "GET,POST,PATCH,DELETE,OPTIONS"
    );
    next();
  })
    
  employee = [];

    //Recieve Data from the database
    app.get('/posts',(req,res)=>{
      var sql = 'SELECT * FROM user';
        mysqlConnection.query(sql, (err,rows) => {
        if(err) throw err;
        for(row of rows){
          const emp ={
            id:row.Id,
            email:row.email,
            username:row.username,
          }
        employee.push(emp);
        }
      res.status(200).json({
        message:"Successfull",
        post:employee
      }
      );
      employee=[];
      });
      }
    );

//Send data to the database
app.post('/test',(req,res)=>{
  const emp = req.body;
  var data = []
  data.push(emp.id.toString())
  data.push(emp.email.toString())
  data.push(emp.username.toString())
  var sql = "INSERT INTO user (id, email, username) VALUES (?)";
  mysqlConnection.query(sql, [data], function (err, result) {
    if (err) throw err;
    res.status(201).json({
      message:"success"
    });  
  });
  
});

const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listening on port ${port}..`);
})

