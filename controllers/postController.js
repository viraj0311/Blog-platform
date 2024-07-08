const Post = require('../models/Post');
const sendResponse = require('../utils/responseHandler');

exports.createPost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const post = new Post({ title, content, tags, author: req.user.id });
    await post.save();
    sendResponse(res, 201, 'Post created successfully', post);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const searchQuery = req.query.search || '';

    const startIndex = (page - 1) * limit;

    let query = {};
    if (searchQuery) {
      query = { title: new RegExp(searchQuery, 'i') };
    }

    const totalPosts = await Post.countDocuments(query);

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex)
      .exec();

    const paginationInfo = {
      currentPage: page,
      postsPerPage: limit,
      totalPosts: totalPosts,
      totalPages: Math.ceil(totalPosts / limit),
    };

    if (page > 1) {
      paginationInfo.previousPage = page - 1;
    }

    if (page < Math.ceil(totalPosts / limit)) {
      paginationInfo.nextPage = page + 1;
    }

    const message = searchQuery 
      ? 'Search results retrieved successfully' 
      : 'Posts retrieved successfully';

    sendResponse(res, 200, message, { posts, pagination: paginationInfo });
  } catch (error) {
    sendResponse(res, 500, 'Server error', null);
  }
};

exports.getPostById = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await Post.findById(id);
    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }
    sendResponse(res, 200, 'Post retrieved successfully', post);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id, title, content, tags } = req.body;
    const post = await Post.findById(id);
    

    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }

    if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return sendResponse(res, 403, 'Not authorized to update this post');
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, tags },
      { new: true }
    );
    sendResponse(res, 200, 'Post updated successfully', updatedPost);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.body;
    const post = await Post.findById(id);
    

    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }

    await Post.findByIdAndDelete(id);
    sendResponse(res, 200, 'Post deleted successfully',post);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};