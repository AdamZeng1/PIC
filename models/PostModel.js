const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const PostSchema = new Schema(
    {
        title: {type: String, required: true},
        post_owner: {type: Schema.Types.ObjectId, ref: "User", required: true},
        image_url: [{type: String, required: true}],
        topic: {
            type: [{type: Schema.Types.ObjectId, ref: "Topic"}],
            select: false
        },
    }, {timestamps: {createdAt: "created_at"}});

module.exports = model('Post', PostSchema);
