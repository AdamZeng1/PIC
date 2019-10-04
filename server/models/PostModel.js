const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const PostSchema = new Schema(
    {
        title: {type: String, required: true},
        post_owner: {type: Schema.Types.ObjectId, ref: "User", required: true, index: true},
        image_url: [{type: String}],
        topic: {
            type: [{type: Schema.Types.ObjectId, ref: "Topic"}],
            select: false
        },
        type: {type: String, required: true},
        emoji: [{type: Object}]
    }, {timestamps: {createdAt: "created_at"}});

module.exports = model('Post', PostSchema);
