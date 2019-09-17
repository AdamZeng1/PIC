const Post = require('../models/PostModel');

class PostController {
    async checkPostExist(req, res, next) {
        const post = Post.find({_id: req.params.id});
        if (post) next();
        else return res.status(404).json({post: "not found"});
    }

    async find(req, res, next) {
        try {
            const {per_page = 10} = req.query;
            const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(req.query.per_page * 1, 1));
            /** 1. post needs to be sorted by datetime
             *  2. join user table and post table using post_owner populate() */
            const posts = await Post.find({title: new RegExp(req.query.title)})
                .sort({createdAt: 'desc'})// sort created date descending
                .populate('post_owner') // fetch owner's information from user's table
                .limit(perPage)
                .skip(page * perPage);
            return res.status(200).json({success: true, posts: posts});
        } catch (e) {
            next(e);
        }
    }

    async findById(req, res) {
        const {fields = ""} = req.query;
        const selectFields = fields
            .split(";")
            .filter((f) => f)
            .map((f) => " +" + f)
            .join("");
        const post = await Post.findById(req.params.id).select(selectFields);
        if (post) return res.status(200).json(post);
        return res.status(404).json({result: "can't find Post id = " + req.params.id});
    }

    async create(req, res) {
        /** adding emoji and type field */
        const post = await new Post({
            title: req.body.title,
            post_owner: req.user.id,
            image_url: req.body.image_url,
            topic: req.body.topic,
            emoji: req.body.emoji,
            type: req.body.type
        }).save();
        if (post) return res.status(200).json(post);
        return res.status(400).json({created: "fail to create new post"});
    }

    async update(req, res) {
        const originPost = await Post.findOne({_id: req.params.id});
        if (originPost.post_owner.toString() !== req.user.id) {
            return res.status(403).json({error: "you have no right to update the post"});
        }
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            image_url: req.body.image_url,
            topic: req.body.topic,
            emoji: req.body.emoji,
            type: req.body.type
        });
        if (post) return res.status(200).json(post); // 返回更新前的post
        return res.status(400).json({updated: false});
    }
}

module.exports = new PostController();

