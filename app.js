const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB=require('./config/database')
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
// const { swaggerUi, specs } = require('./swagger');
const setupSwaggerDocs = require('./swagger');


dotenv.config();

const app = express();

// Middleware
app.use(express.json());


// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
setupSwaggerDocs(app);


connectDB();

// Routes
app.use('/api', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/post', commentRoutes);


const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);

});