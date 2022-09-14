const clientsController = require("../controllers/clients.controller");

var express = require("express");

var router = express.Router();

router.post("/registration", clientsController.register);
/**
 * @swagger
 * /clients/registration:
 *   post:
 *      description: Used to register clients
 *      tags:
 *          - clients
 *      parameters:
 *          - in: body
 *            name: client
 *            description: client data
 *            schema:
 *              type: object
 *              required:
 *                 
 *                 - name
 *                 - phone
 *                 - court
 *              properties:
 *                  name:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 45
 *                      example: Navin
 *                  
 *                  phone:
 *                      type: integer
 *                      minLength: 1
 *                      maxLength: 100
 *                      example: 0725098873
 *                  court:
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

router.post("/all", clientsController.register);

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
 router.get("/all", clientsController.getAllClients)

 /**
  * @swagger
  * 
  * /clients/all:
  *     get:
  *      description: used to get all clients
  *      tags: 
  *          - clients
  *      responses:
  *              '200':
  *                  description: users retrieved 
  *              '500':
  *                  description: internal server error
  *              '400':
  *                  description: bad request
  * 
  */
  router.get("/payments/:client", clientsController.getClientPayments)

  /**
   * @swagger
   * 
   * /clients/payments/{client}:
   *     get:
   *      description: used to get client payments
   *      tags:
 *          - clients
 *      parameters:
 *          - in: path
 *            name: client
 *            schema:
 *              type: integer
 *              required: true
 *            description: numeric Id of the client
   *      
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