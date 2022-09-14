const postsController = require("../controllers/posts.controller");

var express = require("express");

var router = express.Router();

router.post("/add-post", postsController.addPost);
/**
 * @swagger
 * /posts/add-post:
 *   post:
 *      description: Used to add post
 *      tags:
 *          - posts
 *      parameters:
 *          - in: body
 *            name: Post
 *            description: Post data
 *            schema:
 *              type: object
 *              required:
 *                 - description
 *                 - imagePath
 *                 - addedByUserId
 *              properties:
 *                  description:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 1000
 *                      example: This is sample post
 *                  imagePath:
 *                      type: string
 *                      minLength: 1
 *                      maxLength: 1000
 *                      example: abc.png
 *                  addedByUserId:
 *                      type: integer
 *                      example: 1
 *      responses:
 *          '200':
 *              description: Resource added successfully
 *          '500':
 *              description: Internal server error
 *          '400':
 *              description: Bad request
 */

router.get("/get-all-posts", postsController.GetAllPosts)

/**
 * @swagger
 * 
 * /posts/get-all-posts:
 *     get:
 *      description: used to get all posts
 *      tags: 
 *          - posts
 *      responses:
 *              '200':
 *                  description: retrived 
 *              '500':
 *                  description: internal server error
 *              '400':
 *                  description: bad request
 * 
 */

 router.post("/add-post-comment", postsController.addPostComment);
 /**
  * @swagger
  * /posts/add-post-comment:
  *   post:
  *      description: Used to add post comment
  *      tags:
  *          - posts
  *      parameters:
  *          - in: body
  *            name: Comment
  *            description: Post comment
  *            schema:
  *              type: object
  *              required:
  *                 - postId
  *                 - comment
  *                 - addedByUserId
  *              properties:
  *                  postId:
  *                      type: integer
  *                      example: 11
  *                  comment:
  *                      type: string
  *                      minLength: 1
  *                      maxLength: 1000
  *                      example: this is a sample comment 1
  *                  addedByUserId:
  *                      type: integer
  *                      example: 141
  *      responses:
  *          '200':
  *              description: Resource added successfully
  *          '500':
  *              description: Internal server error
  *          '400':
  *              description: Bad request
  */
 

module.exports = router;