# Blog Platform Backend

This is a Node.js backend application for a blog platform.

## Setup Instructions

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory and add the following:


4. Start the server: `npm start`

## API Usage

### Authentication

- Register: POST /api/register
- Login: POST /api/login

### Blog Posts

- Create Post: POST /api/posts
- Get All Posts: GET /api/posts
- Get Single Post: GET /api/posts/:id
- Update Post: PUT /api/posts/:id
- Delete Post: DELETE /api/posts/:id

### Comments

- Add Comment: POST /api/posts/:postId/comments
- Get Comments: GET /api/post/:postId/comments

For detailed API documentation, please refer to the Postman collection.