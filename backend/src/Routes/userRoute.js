const router = require("express").Router();
const userController = require("../Controllers/userController");
const { userVerification } = require("../Middleswares/authMiddleware");


router.get("/users", userVerification, userController.getUsers);
router.get("/users/:userId", userVerification, userController.getUser);
router.put("/users/profile", userVerification, userController.editProfile);
router.get("/users/profile", userVerification, userController.getProfile);
router.delete("/users/profile", userVerification, userController.deleteProfile);

// router.put("/users/follow", userVerification, userController.follow);
// router.put("/users/unfollow", userVerification, userController.unfollow);
// router.get("/users/followers", userVerification, userController.getFollowers);
// router.get("/users/following", userVerification, userController.getFollowing);
// router.get("/users/suggestions", userVerification, userController.getSuggestions);
// router.get("/users/search", userVerification, userController.searchUsers);
// router.get("/users/:userId/posts", userVerification, userController.getUserPosts);
// router.get("/users/:userId/followers", userVerification, userController.getUserFollowers);
// router.get("/users/:userId/following", userVerification, userController.getUserFollowing);
// router.get("/users/:userId/suggestions", userVerification, userController.getUserSuggestions);
// router.get("/users/:userId/search", userVerification, userController.searchUserPosts);

module.exports = router;