const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const CommentSchema = new Schema(
    {
        commentator: {type: Schema.Types.ObjectId, ref: "User", required: true},
        image_url: [{type: String}],
        postId: {type: Schema.Types.ObjectId, ref: "Post", required: true},
        type: {type: String},
        emoji: [{type: Object}]
    }, {timestamps: {createdAt: "created_at"}});

module.exports = model('Comment', CommentSchema);
