// swaggerDocs.js

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The username
 *         email:
 *           type: string
 *           description: The user's email
 *         role:
 *           type: string
 *           description: The user's role (user or admin)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the user was last updated
 *     
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *           description: Tags associated with the post
 *         author:
 *           type: string
 *           description: The id of the user who created the post
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the post was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the post was last updated
 *     
 *     Comment:
 *       type: object
 *       required:
 *         - content
 *         - author
 *         - post
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the comment
 *         content:
 *           type: string
 *           description: The content of the comment
 *         author:
 *           type: string
 *           description: The id of the user who created the comment
 *         post:
 *           type: string
 *           description: The id of the post the comment belongs to
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the comment was last updated
 * 
 * paths:
 *   /api/register:
 *     post:
 *       summary: Register a new user
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - username
 *                 - email
 *                 - password
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *                 role:
 *                   type: string
 *       responses:
 *         201:
 *           description: User registered successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/User'
 *         400:
 *           description: Invalid input
 *         500:
 *           description: Server error
 * 
 *   /api/login:
 *     post:
 *       summary: Log in a user
 *       tags: [Auth]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - email
 *                 - password
 *               properties:
 *                 email:
 *                   type: string
 *                 password:
 *                   type: string
 *       responses:
 *         200:
 *           description: Login successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       user:
 *                         $ref: '#/components/schemas/User'
 *                       token:
 *                         type: string
 *         400:
 *           description: Invalid credentials
 *         500:
 *           description: Server error
 * 
 *   /api/posts/createPost:
 *     post:
 *       summary: Create a new post
 *       tags: [Posts]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - title
 *                 - content
 *               properties:
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         201:
 *           description: Post created successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/Post'
 *         401:
 *           description: Unauthorized
 *         500:
 *           description: Server error
 * 
 *   /api/posts/getAllPost:
 *     get:
 *       summary: Retrieve a list of posts
 *       tags: [Posts]
 *       parameters:
 *         - in: query
 *           name: search
 *           schema:
 *             type: string
 *           description: Search string for post title
 *         - in: query
 *           name: page
 *           schema:
 *             type: integer
 *           description: Page number
 *         - in: query
 *           name: limit
 *           schema:
 *             type: integer
 *           description: Number of items per page
 *       responses:
 *         200:
 *           description: A list of posts.
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: object
 *                     properties:
 *                       posts:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Post'
 *                       pagination:
 *                         type: object
 *                         properties:
 *                           currentPage:
 *                             type: integer
 *                           postsPerPage:
 *                             type: integer
 *                           totalPosts:
 *                             type: integer
 *                           totalPages:
 *                             type: integer
 * 
 *   /api/posts/getPostById:
 *     get:
 *       summary: Get a post by ID
 *       tags: [Posts]
 *       parameters:
 *         - in: query
 *           name: id
 *           required: true
 *           schema:
 *             type: string
 *           description: The post ID
 *       responses:
 *         200:
 *           description: Post retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/Post'
 *         404:
 *           description: Post not found
 *         500:
 *           description: Server error
 * 
 *   /api/posts/updatePost:
 *     put:
 *       summary: Update a post
 *       tags: [Posts]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 content:
 *                   type: string
 *                 tags:
 *                   type: array
 *                   items:
 *                     type: string
 *       responses:
 *         200:
 *           description: Post updated successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/Post'
 *         401:
 *           description: Unauthorized
 *         403:
 *           description: Forbidden
 *         404:
 *           description: Post not found
 *         500:
 *           description: Server error
 * 
 *   /api/posts/deletePost:
 *     delete:
 *       summary: Delete a post
 *       tags: [Posts]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - id
 *               properties:
 *                 id:
 *                   type: string
 *       responses:
 *         200:
 *           description: Post deleted successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: null
 *         401:
 *           description: Unauthorized
 *         403:
 *           description: Forbidden
 *         404:
 *           description: Post not found
 *         500:
 *           description: Server error
 * 
 *   /api/post/addComment:
 *     post:
 *       summary: Add a new comment to a post
 *       tags: [Comments]
 *       security:
 *         - bearerAuth: []
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               required:
 *                 - postId
 *                 - content
 *               properties:
 *                 postId:
 *                   type: string
 *                 content:
 *                   type: string
 *       responses:
 *         201:
 *           description: Comment added successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     $ref: '#/components/schemas/Comment'
 *         401:
 *           description: Unauthorized
 *         404:
 *           description: Post not found
 *         500:
 *           description: Server error
 * 
 *   /api/post/getComment:
 *     get:
 *       summary: Get all comments for a post
 *       tags: [Comments]
 *       parameters:
 *         - in: query
 *           name: postId
 *           required: true
 *           schema:
 *             type: string
 *           description: The post ID
 *       responses:
 *         200:
 *           description: Comments retrieved successfully
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   statusCode:
 *                     type: integer
 *                   message:
 *                     type: string
 *                   data:
 *                     type: array
 *                     items:
 *                       $ref: '#/components/schemas/Comment'
 *         404:
 *           description: Post not found
 *         500:
 *           description: Server error
 */

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Request a password reset OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 * 
 * /api/reset-password:
 *   post:
 *     summary: Reset password using OTP
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - otp
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid or expired OTP
 *       500:
 *         description: Server error
 */



module.exports = {};