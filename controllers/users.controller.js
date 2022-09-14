const usersService = require("../services/users.service");
const db = require("../config/db.config.js");

const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");
exports.register = (req, res, next) => {
  // Validation area
  const { name,  email, password } = req.body;
  db.query(
    "SELECT email FROM users where email=?",
    [email],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length > 0) {
        return res.send("email already exists");
      }

      const hashedpassword = await bcrypt.hash(password, 10);

      const data = {
        name: name,
        email: email,
        password: hashedpassword,
      };
      console.log(hashedpassword);

      usersService.register(data, (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).send({ success: 0, data: "Bad request" });
        }
        return res.status(200).send({
          success: 1,
          data: results,
        });
      });
    }
  );
};

exports.logins = (req, res, next) => {
  // Validation area
  const { emailId } = req.body;
  db.query(
    "SELECT id, name, email, password FROM users where email=? limit 1",
    [emailId],
    async (error, results) => {
      if (error) {
        console.log(error);
      }
      if (results.length == 0) {
        return res.send("user doesnt exist");
      }

      
      const user = await results
      const userpass =  user[0].password
      const firstName = user[0].firstName
      const passwordEnteredByUser = req.body.password
      const emailId = user[0].emailId
      // const userpass = '$2a$10$xUSr6r/1nKsRn7ciyBMnnO0c56BFnQLHrqO089XYRHsKGzlCCX9q2'

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

      const data = {
        firstName: firstName,
        emailId: emailId,
        password: userpass,
        passwordEnteredByUser: passwordEnteredByUser
      };
      console.log(data);

      // usersService.logins(data, (error, results) => {
      //   if (error) {
      //     console.log(error);
      //     return res.status(400).send({ success: 0, data: "Bad request" });
      //   }
      //   return res.status(200).send({
      //     success: 1,
      //     data: results,
      //   });
      // });
    }
  );
};

exports.login = (req, res, next) => {
  // Validation area
  
  const data = {
    emailId: req.body.emailId,
    password: req.body.password,
  };
  usersService.login(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "Bad request" });
    }
    return res.status(200).send({
      success: 1,
      data: results,
    });
  });
};

exports.GetAllUsers = (req, res, next) => {
  const data = {};
  usersService.GetAllUsers(data, (error, results) => {
    if (error) {
      console.log(error);
      return res.status(400).send({ success: 0, data: "bad request" });
    }
    return res.status(200).send({ success: 1, data: results });
  });
};
