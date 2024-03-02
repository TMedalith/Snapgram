const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: [true, "Your description is required"],
    },
    image: {
        type: String,
        required: [true, "Your image is required"],
    },
    likes: [
        {
            type: ObjectId,
            ref: "User",
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    Comments: [
        {
            text: String,
            postedBy: {
                type: ObjectId,
                ref: "User",
            },
        }
    ],
    postedBy: {
        type: ObjectId,
        ref: "User",
    },
}, {timestamps: true});

module.exports = mongoose.model("Post", postSchema);
