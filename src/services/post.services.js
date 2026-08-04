import Post from "../models/postSchema.js";

const serializePost = (post) => {
  const plainPost = post.toObject ? post.toObject() : post;

  return {
    ...plainPost,
    likeCount: Array.isArray(plainPost.likes) ? plainPost.likes.length : 0,
  };
};

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

export const getAllPostsService = async () => {
  const posts = await Post.find()
    .populate("author", "name email role")
    .populate("comments.user", "name email")
    .sort({ createdAt: -1 });

  return posts.map((post) => serializePost(post));
};

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

export const deletePostService = async (postId) => {
  const post = await Post.findByIdAndDelete(postId);

  if (!post) {
    const error = new Error("Post not found");
    error.statusCode = 404;
    throw error;
  }

  return post;
};
