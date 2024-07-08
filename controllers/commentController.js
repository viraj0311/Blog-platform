const Comment = require('../models/Comment');
const Post = require('../models/Post');
const sendResponse = require('../utils/responseHandler');

exports.addComment = async (req, res) => {
  try {
    const { postId, content } = req.body;

    const post = await Post.findById(postId);
    if (!post) {
      return sendResponse(res, 404, 'Post not found');
    }

    const comment = new Comment({
      content: content,
      author: req.user.id,
      post: postId
    });

    await comment.save();
    sendResponse(res, 201, 'Comment added successfully', comment);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};

exports.getComments = async (req, res) => {
  try {
    const { postId } = req.body;

    const comments = await Comment.find({ post: postId })
      .sort({ createdAt: -1 })
      .populate('author', 'username');

    sendResponse(res, 200, 'Comments retrieved successfully', comments);
  } catch (error) {
    sendResponse(res, 500, 'Server error');
  }
};