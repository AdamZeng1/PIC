const Comment = require('../models/CommentModel');
const Post = require('../models/PostModel');
const ObjectId = require('mongoose').Types.ObjectId;

class CommentController {

    async findByUserId(req, res) {
        try {
            const {per_page = 10, page = 0} = req.query;
            const queryPage = Math.round(Math.max(page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(per_page * 1, 1));
            console.log(req.params.userId);
            const result = await Comment.find({commentator: new ObjectId(req.params.userId)})
                .sort({created_at: -1})// sort created date descending
                .populate('commentator')
                .populate('postId')// fetch owner's information from user's table
                .limit(perPage)
                .skip(queryPage * perPage);
            if (result) return res.status(200).json(result);
            else return res.status(404).json({comments: "not found"});
        } catch (e) {
            return res.status(404).json({comments: "not found"});
        }
    }

    async checkPostExist(req, res, next) {
        try {
            const post = await Post.findById(req.params.postId);
            if (post) next();
            else return res.status(404).json({post: "not found"});
        } catch (e) {
            return res.status(404).json({post: "not found"});
        }
    }

    async checkCommentExist(req, res, next) {
        try {
            const comment = await Comment.findById(req.params.id);
            if (comment) {
                req.comment = comment;
                next();
            } else if (comment.postId !== req.params.postId) return res.status(404).json({error: 'there is no this comment under this post'});
            else return res.status(404).json({comment: "not found"});
        } catch (e) {
            return res.status(404).json({comment: "not found"});
        }
    }

    async find(req, res, next) {
        try {
            const {per_page = 10} = req.query;
            const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(per_page * 1, 1));
            /** comment_owner populate */
            const comments = await Comment.find({postId: req.params.postId})
                .limit(perPage)
                .populate("commentator")
                .skip(page * perPage);
            return res.status(200).json({success: true, comments: comments});
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
        const comment = await Comment.findById(req.params.id).select(selectFields).populate('commentator');
        if (comment) return res.status(200).json(comment);
        return res.status(404).json({result: "can't find Comment id = " + req.params.id});
    }

    async checkCommentator(req, res, next) {
        if (req.comment.commentator.toString() !== req.user.id.toString()) {
            res.status(403).json({error: 'you have no right'});
        }
        return next();
    }

    async create(req, res) {
        const comment = await new Comment({
            commentator: req.user.id,
            image_url: req.body.image_url,
            postId: req.params.postId,
            type: req.body.type,
            emoji: req.body.emoji
        }).save();
        if (comment) return res.status(200).json(comment);
        return res.status(400).json({created: "fail to create new comment"});
    }

    async update(req, res) {
        const comment = await Comment.findByIdAndUpdate(req.params.id, {
            commentator: req.user.id,
            image_url: req.body.image_url,
            postId: req.params.postId,
            type: req.body.type,
            emoji: req.body.emoji
        });
        if (comment) return res.status(200).json(comment); // return old post which is updated
        return res.status(400).json({updated: false});
    }

    async del(req, res) {
        await Comment.findByIdAndRemove(req.params.id);
        return res.status(204).json({success: `remove ${req.params.id} successfully`});
    }
}

module.exports = new CommentController();

