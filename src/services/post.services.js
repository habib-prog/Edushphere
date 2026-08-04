import Post from "../models/postSchema.js";

// Convert a Mongoose document into a plain object and add likeCount.
const serializePost = (post) => {
  const plainPost = post.toObject ? post.toObject() : post;

  return {
    ...plainPost,
    likeCount: Array.isArray(plainPost.likes) ? plainPost.likes.length : 0,
  };
};

// Create a new post and save it to the database.
export const createPostService = async ({
  type,
  title,
  content,
  imageUrl,
  adminId,
}) => {
  if (!type || !title) {
    const error = new Error("Type and title are required");
    error.statusCode = 400;
    throw error;
  }

  if (type === "image" && !imageUrl) {
    const error = new Error("Image URL is required for image post");
    error.statusCode = 400;
    throw error;
  }

  const post = await Post.create({
    type,
    title,
    content,
    imageUrl,
    author: adminId,
  });

  return serializePost(post);
};

// Fetch all posts from newest to oldest.
export const getAllPostsService = async () => {
  const posts = await Post.find()
    .populate("author", "name email role")
    .populate("comments.user", "name email")
    .sort({ createdAt: -1 });

  return posts.map((post) => serializePost(post));
};

// Fetch one post by its ID.
export const getPostByIdService = async (postId) => {
  const post = await Post.findById(postId)
    .populate("author", "name email role")
    .populate("comments.user", "name email");

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return serializePost(post);
};

// Add or remove the current user's like from the post.
export const toggleLikeService = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  const alreadyLiked = post.likes.some(
    (id) => id.toString() === userId.toString(),
  );

  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save();

  return {
    liked: !alreadyLiked,
    totalLikes: post.likes.length,
  };
};

// Add a new comment to a post.
export const addCommentService = async (postId, userId, text) => {
  if (!text || !text.trim()) {
    const error = new Error("Comment text is required");
    error.statusCode = 400;
    throw error;
  }

  const post = await Post.findById(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  post.comments.push({
    user: userId,
    text: text.trim(),
  });

  await post.save();

  return serializePost(post);
};

// Delete a post from the database.
export const deletePostService = async (postId) => {
  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return post;
};
