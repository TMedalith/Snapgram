const router = require("express").Router();
const postController = require("../Controllers/postController");
const { userVerification } = require("../Middleswares/authMiddleware");


router.post("/posts", userVerification, postController.createPost);
router.get("/posts", userVerification, postController.getPosts);
router.put("/posts/:postId", userVerification, postController.editPost);
router.get("/posts/:postId", userVerification, postController.getPost);
router.delete("/posts/:postId", userVerification,  postController.deletePost);

router.put("/posts/:postId/like", userVerification, postController.likePost);
router.put("/posts/:postId/unlike", userVerification, postController.unlikePost);
router.put("/posts/:postId/comment", userVerification, postController.commentPost);
router.delete("/posts/:postId/comment/:commentId", userVerification, postController.uncommentPost);

router.get("/myposts", userVerification, postController.myPosts);





module.exports = router;