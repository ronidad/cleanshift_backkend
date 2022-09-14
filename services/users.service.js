const db = require("../config/db.config.js");
const bcrypt = require("bcryptjs");


exports.register = (data, callback) => {
  db.query(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [data.name, data.email, data.password],
    (error, results, fields) => {
      if (error) {
        return callback(error);
      }
      return callback(null, `Registration successful`);
    }
  );
};

exports.login = (data, callback) =>{
  db.query(
    `SELECT id  FROM users WHERE emailId = ? AND password = ?`,
    [data.emailId, data.password],
    (error, results, fields) => {
      if (error) {
        return callback(error)
      }
      if (results.length>0) {
        return callback (null, "Login successful")
      }
      else {
        return callback ("invalid credentials")
      }
    }
  )
},
exports.logins = (data, callback) =>{

  bcrypt.compare(data.passwordEnteredByUser, data.userpass, function(error, isMatch) {
    if (error) {
      return callback(error)
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
},
exports.GetAllUsers = (data, callback) => {
  db.query(
    `SELECT id, firstName, lastName, emailId FROM users`,
      [],
      (error, results, fields)=>{
          if (error) {
              return callback(error);

          }
          return callback(null, results);
          
      }
  );
}
