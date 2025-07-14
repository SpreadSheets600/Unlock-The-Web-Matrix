const router = require("express").Router();
const { getPosts, createPost } = require("../controllers/postController");
const auth = require("../middleware/auth");

router.get("/", getPosts);
router.post("/", auth, createPost);

module.exports = router;
