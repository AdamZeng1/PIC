const SecondComment = require('../models/SecondCommentModel');
const Post = require('../models/PostModel');
const Comment = require('../models/CommentModel');

class SecondCommentController {
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
            const comment = await Comment.findById(req.params.commentId);
            if (comment) {
                req.comment = comment;
                next();
            } else if (comment.postId !== req.params.postId) return res.status(404).json({error: 'there is no this comment under this post'});
            else return res.status(404).json({comment: "not found"});
        } catch (e) {
            return res.status(404).json({comment: "not found"});
        }
    }

    async checkSecondCommentExist(req, res, next) {
        try {
            const secondComment = await SecondComment.findById(req.params.id);
            if (secondComment) {
                req.secondComment = secondComment;
                next();
            } else if (secondComment.postId !== req.params.postId) return res.status(404).json({error: 'there is no this secondComment under this post'});
            else if (secondComment.commentId !== req.params.commentId) return res.status(404).json({error: 'there is no this secondComment under this comment'});
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
            const secondComments = await SecondComment.find({
                postId: req.params.postId,
                commentId: req.params.commentId
            }).populate('postId')
                .populate('commentId')
                .populate('commentator')
                .limit(perPage)
                .skip(page * perPage);
            return res.status(200).json({success: true, secondComments: secondComments});
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
        const secondComment = await SecondComment.findById(req.params.id).select(selectFields).populate('commentator').populate('commentId').populate('postId');
        if (secondComment) return res.status(200).json(secondComment);
        return res.status(404).json({result: "can't find secondComment id = " + req.params.id});
    }

    async checkCommentator(req, res, next) {
        if (req.secondComment.commentator.toString() !== req.user.id.toString()) {
            res.status(403).json({error: 'you have no right'});
        }
        return next();
    }

    async create(req, res) {
        const secondComment = await new SecondComment({
            commentator: req.user.id,
            image_url: req.body.image_url,
            postId: req.params.postId,
            commentId: req.params.commentId,
            type: req.body.type,
            emoji: req.body.emoji
        }).save();
        if (secondComment) return res.status(200).json(secondComment);
        return res.status(400).json({created: "fail to create new comment"});
    }

    async update(req, res) {
        const secondComment = await SecondComment.findByIdAndUpdate(req.params.id, {
            commentator: req.user.id,
            image_url: req.body.image_url,
            postId: req.params.postId,
            commentId: req.params.commentId,
            type: req.body.type,
            emoji: req.body.emoji
        });
        if (secondComment) return res.status(200).json(secondComment); // 返回更新前的post
        return res.status(400).json({updated: false});
    }

    async del(req, res) {
        await SecondComment.findByIdAndRemove(req.params.id);
        return res.status(204).json({success: `remove ${req.params.id} successfully`});
    }
}

module.exports = new SecondCommentController();

