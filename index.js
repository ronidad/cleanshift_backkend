const express = require("express");
const { json } = require("express/lib/response");
const jwt = require("jsonwebtoken");
// const verify = require("jsonwebtoken");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");



const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "cleanshift",
});


const cors = require("cors");
app.use(cors({
    origin: '*'
    // origin: 'http://localhost:8080'
}));

const requireAuth = (req,res, next)=>{
  const token = "edggdstsyjjd";
  // check is token exists and is verified
  if (token){
    jwt.verify(token, 'secretkey',(error, decodedToken)=>{
      if (error){
        console.log(error.message)
        res.redirect('/login')
      }
      console.log(decodedToken);
      next()
    });

  }
  
}



app.post("/user/registration", async (req, res) => { //moved to users/registration
  const { name, email, password } = req.body;
  db.query("SELECT email FROM users where email=?",[email], async (error, results) => {
    if (error) {
      console.log(error);
    }
    if (results.length > 0) {
      return res.send('email already exists');
    }

    const hashedpassword = await bcrypt.hash(password,10);
    const sql = "INSERT INTO users SET ?";
    const post = {name:name, email:email, password:hashedpassword}
    console.log(hashedpassword)

    db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(sql);
      res.send('user registered');
    });

  });
});

app.post("/receive/payment", async (req, res) => {
  const { name, amount, type, reference } = req.body;
  

    const client_id = name.split('-')[0]; 
    const sql = "INSERT INTO payments SET ?";
    const post = {client_id, amount, type, reference}
    console.log(name)

    db.query(sql, post, (err, result) => {
      if (err) throw err;
      console.log(req.body);
      res.send('payment received');
    });

  });





app.post("/court/registration", async (req, res) => {
  const { name, area } = req.body;
  db.query("SELECT name FROM courts where name=?",[name], async (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      return res.send('court already exists');
    }

    
    const sql = "INSERT INTO courts SET ?";
    const post = {name, area}
    

    db.query(sql, post, (err, result) => {
      if (err) throw err;
      res.send('court registered');
    });

  });
});
app.post("/client/registration", async (req, res) => { //moved to clients.registration
  const { name, phone, court } = req.body;
  db.query("SELECT name FROM clients where phone=?",[phone], async (error, results) => {
    if (error) {
      throw error;
    }
    if (results.length > 0) {
      return res.send('client already exists');
    }

    
    const sql = "INSERT INTO clients SET ?";
    const post = {name,phone, court}
    

    db.query(sql, post, (err, result) => {
      if (err) throw err;
      res.send('client registered');
    });

  });
});



//get request from database 
app.get('/get/courts', (_, res)=>{
  sql = 'SELECT * FROM courts';
  db.query(sql, (err,result)=>{
      if (err) throw err;
      res.send(result)
  });
});

app.get('/get/clients', (_, res)=>{ //moved to clients/all
  sql = 'SELECT id, name, phone, court,reg_date FROM clients';
  db.query(sql, (err,result)=>{
      if (err) throw err;
      console.log(result)
      res.send(result)
  });
});
//    sql = 'SELECT payments.id, clients.name, payments.amount FROM payments INNER JOIN clients on payments.client_id = clients.id';

app.get('/get/payments', (_, res)=>{
  sql = 'SELECT payments.id, clients.id as client_id, clients.name, payments.amount, payments.payment_date,payments.type,payments.reference FROM payments INNER JOIN clients on payments.client_id = clients.id';
  db.query(sql, (err,result)=>{
      if (err) throw err;
      res.send(result)
      // console.log(result)
  });
});




app.get('/get/payments/:client', (req, res)=>{
  const cl = req.params.client
  sql = `SELECT payments.id as payment_id, clients.name, clients.id as client_id, payments.amount, payments.payment_date FROM payments INNER JOIN clients on payments.client_id = clients.id where clients.id =?`,[cl]; 
  db.query(sql, cl, (err,result)=>{
      if (err) throw err;
      res.send(result)
      console.log(cl)
  });
});





app.post("/api/posts", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", (err, authDatas) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "post created...",
        authDatas,
      });
    }
  });
});
app.post("/login",async (req,res)=>{
  const {email, password } = req.body;
  db.query("SELECT id, name, email,password FROM `users` WHERE `email`=?", [email], async (error, results)=>{
    if (error){
      console.log(error)
    }
    
    const user = await results
   
    const userpass =  user[0].password
    const passwordEnteredByUser = req.body.password

    bcrypt.compare(passwordEnteredByUser, userpass, function(err, isMatch) {
      if (err) {
        throw err
      } else if (!isMatch) {  
        console.log("Password doesn't match!")
        res.send('Invalid password')
      } 
        // console.log(user)
        user[0].password = undefined
        jwt.sign({ user }, "secretkey", { expiresIn: "60s" }, (err, token) => {
          res.json({
            token,
            user
            
            
          });
          console.log(user)
          console.log(token)
        });

      
    })


   

    
  });
  
  // const User = );
  const hashedpassword = await bcrypt.hash(password,10);
  // console.log(hashedpassword)


});

app.post("/api/login", (req, res) => {
  // create a mock user
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };
  jwt.sign({ user }, "secretkey", { expiresIn: "60s" }, (err, token) => {
    res.json({
      token,
    });
  });
});
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    console.log(bearerToken)

    next();
  } else {
    // console.log(bearerHeader)
    res.sendStatus(403);
  }
}
function checkToken(req, res, next){
  const token = req.headers["authorization"];
  if (token) {
    // token = token.split(' ')[1]
    token = token.slice(7);
    jwt.verify(token, "secretkey", (err, decoded) =>{
      if (err){
        res.json({
          message: "invalid token"
        });

      }else {
        console.log(decoded)
        next()
      }
    } )
    //do ssomething
  }else {
    res.json({
      message: "access denied you are unauthorized user"
    })
  }
}

app.listen(5000, () => console.log("server listening to port 5000"));
