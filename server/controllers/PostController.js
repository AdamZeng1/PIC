const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');
const ObjectId = require('mongoose').Types.ObjectId;

class PostController {

    async del(req, res) {
        await Post.findByIdAndRemove(req.params.id);
        return res.status(204).json({success: `remove ${req.params.id} successfully`});
    }

    async findByUserId(req, res) {
        try {
            const {per_page = 10, page = 0} = req.query;
            const queryPage = Math.round(Math.max(page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(per_page * 1, 1));
            console.log(req.params.userId);
            const result = await Post.find({post_owner: new ObjectId(req.params.userId)})
                .sort({created_at: -1})// sort created date descending
                .populate('post_owner') // fetch owner's information from user's table
                .limit(perPage)
                .skip(queryPage * perPage);
            if (result) return res.status(200).json(result);
            else return res.status(404).json({post: "not found"});
        } catch (e) {
            return res.status(404).json({post: "not found"});
        }
    }

    async checkPostExist(req, res, next) {
        try {
            const post = await Post.findById(req.params.id);
            if (post) next();
            else return res.status(404).json({post: "not found"});
        } catch (e) {
            return res.status(404).json({post: "not found"});
        }
    }

    async find(req, res, next) {
        try {
            const {per_page = 10} = req.query;
            const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(req.query.per_page * 1, 1));
            /** 1. post needs to be sorted by datetime
             *  2. join user table and post table using post_owner populate() */
            let posts = await Post.find({title: new RegExp(req.query.title)})
                .sort({created_at: -1})// sort created date descending
                .populate('post_owner') // fetch owner's information from user's table
                .limit(perPage)
                .skip(page * perPage);
            const numberOfPosts = await Post.count();
            return res.status(200).json({success: true, numberOfPosts: numberOfPosts, posts: posts});
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
        const post = await Post.findById(req.params.id).select(selectFields).populate('post_owner');
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

    async findThreadPostByCommentsNumber(req, res) {
        const {per_page = 5, page = 0} = req.query;
        const queryPage = Math.round(Math.max(page * 1, 1)) - 1;
        const perPage = Math.round(Math.max(per_page * 1, 1));
        const result = await Post.aggregate([
            {
                $lookup: {
                    from: 'comments',
                    let: {post_id: '$_id'},
                    pipeline: [
                        {$match: {$expr: {$eq: ['$postId', '$$post_id']}}},
                        {$sortByCount: '$postId'},
                    ],
                    as: 'numberOfComments'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'post_owner',
                    foreignField: '_id',
                    as: 'post_owner',
                }
            },
            {$match: {numberOfComments: {$elemMatch: {$ne: null}}}},
            {$sort: {'numberOfComments.count': -1}},
            {$limit: perPage},
            {$skip: queryPage * perPage}
        ]);
        const numberOfPosts = result.length;

        if (result) {
            return res.status(200).json({success: true, numberOfPosts: numberOfPosts, result: result});
        } else {
            return res.status(400).json({status: "get thread posts fail"});
        }
    }
}

module.exports = new PostController();

