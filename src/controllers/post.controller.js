import {
  addCommentService,
  createPostService,
  deletePostService,
  getAllPostsService,
  getPostByIdService,
  toggleLikeService,
} from "../services/post.services.js";
import { uploadToCloudinary } from "../helpers/Upload/cloudinary.js";

// Create a new post, including optional image upload to Cloudinary.
export const createPostController = async (req, res) => {
  try {
    let imageUrl = req.body.imageUrl || "";

    // If an image file is sent, upload it first and use the Cloudinary URL.
    if (req.file) {
      const uploaded = await uploadToCloudinary(
        req.file.buffer,
        "edusphere/posts",
      );
      imageUrl = uploaded.secure_url;
    }

    const post = await createPostService({
      type: req.body.type,
      title: req.body.title,
      content: req.body.content,
      imageUrl,
      adminId: req.user?.id,
    });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Get all posts for the notifications/feed page.
export const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPostsService();

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Get one post by its ID.
export const getPostByIdController = async (req, res) => {
  try {
    const post = await getPostByIdService(req.params.postId);

    return res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Toggle like/unlike for a post.
export const toggleLikeController = async (req, res) => {
  try {
    const result = await toggleLikeService(req.params.postId, req.user?.id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Add a comment to an existing post.
export const addCommentController = async (req, res) => {
  try {
    const post = await addCommentService(
      req.params.postId,
      req.user?.id,
      req.body.text,
    );

    return res.status(201).json({
      success: true,
      message: "Comment added successfully",
      data: post,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// Delete a post by ID.
export const deletePostController = async (req, res) => {
  try {
    const post = await deletePostService(req.params.postId);

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: post,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
