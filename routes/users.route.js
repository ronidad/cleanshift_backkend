const usersController = require("../controllers/users.controller");

var express = require("express");

var router = express.Router();

router.post("/registration", usersController.register);
/**
 * @swagger
 * /users/registration:
 *   post:
 *      description: Used to register user
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: User
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 
 *                 - name
 *                 - email
 *                 - password
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Navin
 *                  
 *                  email:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: navin@sample.com
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: abcd
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.post("/login", usersController.logins);

/**
 * @swagger
 * /users/login:
 *   post:
 *      description: Used to login user
 *      tags:
 *          - users
 *      parameters:
 *          - in: body
 *            name: User
 *            description: User data
 *            schema:
 *              type: object
 *              required:
 *                 - emailId
 *                 - password
 *              properties:
 *                  
 *                  emailId:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: navin@sample.com
 *                  password:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: abcd
 *      responses:
 *          '200':
 *              description: login successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */
 router.get("/all/users", usersController.GetAllUsers)

 /**
  * @swagger
  * 
  * /users/all/users:
  *     get:
  *      description: used to get all user
  *      tags: 
  *          - users
  *      responses:
  *              '200':
  *                  description: users retrieved 
  *              '500':
  *                  description: internal server error
  *              '400':
  *                  description: bad request
  * 
  */

module.exports = router;