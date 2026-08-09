import express from "express";
import {
  addCommentController,
  createPostController,
  deletePostController,
  getAllPostsController,
  getPostByIdController,
  toggleLikeController,
} from "../../controllers/post.controller.js";
import { authMiddleWare } from "../../middlewares/auth.middlware.js";
import { roleCheck } from "../../middlewares/roles.middleware.js";
import { upload } from "../../helpers/Upload/multer.js";

const router = express.Router();

router.get("/", authMiddleWare, getAllPostsController);
router.get("/:postId", authMiddleWare, getPostByIdController);

router.post(
  "/",
  authMiddleWare,
  roleCheck(["admin"]),
  upload.single("image"),
  createPostController,
);

router.post("/:postId/like", authMiddleWare, toggleLikeController);
router.post("/:postId/comments", authMiddleWare, addCommentController);
router.delete(
  "/:postId",
  authMiddleWare,
  roleCheck(["admin"]),
  deletePostController,
);

export default router;
