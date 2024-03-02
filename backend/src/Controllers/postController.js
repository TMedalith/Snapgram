const Post  = require('../Models/post')

module.exports.createPost = async (req, res) => {
    try {
        const { description, image } = req.body;
        if (!description || !image) {
            return res.status(422).json({ error: "Plase add all the fields" })
        }
        req.user.password = undefined
        const newPost = new Post({
            description,
            image,
            postedBy: req.user
        });

        const result = await post.save();
        res.json({ post: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


module.exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        await post.deleteOne();
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
    }
}

module.exports.getPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
    }
}

module.exports.editPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        post.description = req.body.description;
        await post.save();
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
    }
}

module.exports.likePost = async (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
}

module.exports.unlikePost = async (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
}

module.exports.commentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.Comments.push({
            text: req.body.text,
            postedBy: req.user._id,
        });
        await post.save();
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
    }
}

module.exports.uncommentPost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        const comment = post.Comments.find(
            (comment) => comment._id.toString() === req.params.commentId
        );
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        if (comment.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        post.Comments.pull(comment);
        await post.save();
        res.status(200).json({ success: true, post });
    } catch (error) {
        console.error(error);
    }
}

module.exports.myPosts = async (req, res) => {
    try {
        const posts = await Post.find({ postedBy: req.user._id });
        res.status(200).json({ success: true, posts });
    } catch (error) {
        console.error(error);
    }
}
