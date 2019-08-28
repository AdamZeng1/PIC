const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const CommentSchema = new Schema(
    {
        commentator: {type: Schema.Types.ObjectId, ref: "User", required: true},
        image_url: [{type: String, required: true}],
        postId: {type: Schema.Types.ObjectId, ref: "Post", required: true}
    }, {timestamps: {createdAt: "created_at"}});

module.exports = model('Comment', CommentSchema);
