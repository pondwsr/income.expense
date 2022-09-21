var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken')
const secret = 'income-login';

app.use(cors())
const mysql = require('mysql2');
// connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'income'
  });

// Register Api
app.post('/register',jsonParser, function (req, res, next) {
    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        connection.execute(
            'INSERT INTO users (email,name,lname,password) VALUES (?,?,?,?)',
            [req.body.email, req.body.name , req.body.lname, hash],
            function(err, results, fields) {
             if(err){res.json({status: 'error', message:err}); return }
              res.json({status: 'OK'})
            }
          );
    });
})

// Login Api
app.post('/login',jsonParser, function (req, res, next) {
    connection.execute(
        'SELECT * FROM users WHERE email=?',
        [req.body.email],
        function(err, users , fields) {
         if(err){res.json({status: 'error', message:err}); return }
         if (users.length == 0) {res.json({status: 'error', message: 'no user'}); return}
         bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
if (isLogin){
    var token = jwt.sign({ email: users[0].email }, secret, { expiresIn: '1h' });

    res.json({status: 'ok' ,id:users[0].id,name:users[0].name,lname:users[0].lname,message: 'login success', token,})
  
} else{
    res.json({status: 'error' , message: 'login failed'})
}
         }); 
         
        }
      );

})

// Check token Api
app.post('/authen',jsonParser, function (req, res, next) {
  try{
      const token = req.headers.authorization.split(' ')[1]
      var decoded = jwt.verify(token, secret);
      res.json({status: 'ok', decoded})
  }catch(err){
  res.json({status:'error', message: err.message})
  }
  })



//____________________________________________Income__________________________________//

app.get('/users/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `income` WHERE `users_id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

//Insert Income //
app.post('/insert_income',jsonParser, function (req, res, next) {
  connection.execute(
      'INSERT INTO income (users_id,date,itemname,amount) VALUES (?,?,?,?)',
      [req.body.users_id, req.body.date , req.body.itemname, req.body.amount],
      function(err, results, fields) {
       if(err){res.json({status: 'error', message:err}); return }
        res.json({status: 'OK'})
      }
    );
})

//Update income //

app.put('/update_income', function (req, res, next) {
  const id = req.body.id;
  const date = req.body.date;
  const itemname = req.body.itemname;
  const amount = req.body.mount;

  db.query("UPDATE income SET date = ?, itemname = ?, amount = ? WHERE id = ?", [date,itemname,amount,id] ,(err, result)=> {
    if(err){res.json({status: 'error', message:err}); return }
        res.json({status: 'OK'})
  })
})
//Delete income//
app.delete('/deleteincome', function (req, res, next) {
  connection.query(
    'DELETE FROM `income` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})


//Get all //
app.get('/inex/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `income`,`expense` WHERE `users_id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})
//---------------------------------------expense--------------------------------------//

//Get expense //
app.get('/expense/:id', function (req, res, next) {
  const id = req.params.id;
  connection.query(
    'SELECT * FROM `expense` WHERE `users_id` = ?',
    [id],
    function(err, results) {
      res.json(results);
    }
  );
})

//Insert Expense //
app.post('/insert_expense',jsonParser, function (req, res, next) {
  connection.execute(
      'INSERT INTO expense (users_id,date,itemname,amount) VALUES (?,?,?,?)',
      [req.body.users_id, req.body.date , req.body.itemname, req.body.amount],
      function(err, results, fields) {
       if(err){res.json({status: 'error', message:err}); return }
        res.json({status: 'OK'})
      }
    );
})

//Update Expense//
app.put('/update_expense', function (req, res, next) {
  const id = req.body.id;
  const date = req.body.date;
  const itemname = req.body.itemname;
  const amount = req.body.mount;

  db.query("UPDATE expense SET date = ?, itemname = ?, amount = ? WHERE id = ?", [date,itemname,amount,id] ,(err, result)=> {
    if(err){res.json({status: 'error', message:err}); return }
        res.json({status: 'OK'})
  })
})

//Delete expence//
app.delete('/deleteexpense', function (req, res, next) {
  connection.query(
    'DELETE FROM `expense` WHERE id = ?',
    [req.body.id],
    function(err, results) {
      res.json(results);
    }
  );
})





app.listen(3333, jsonParser, function () {
  console.log('CORS-enabled web server listening on port 3333')
})