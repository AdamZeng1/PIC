const Topic = require('../models/TopicModel');
const Post = require('../models/PostModel');
const config = require('../config/config');

class TopicController {
    async checkTopicExist(req, res, next) {
        const topic = Topic.find({_id: req.params.id});
        if (topic) next();
        else return res.states(404).json({topic: "not found"});
    }

    async find(req, res, next) {
        try {
            const {per_page = 10} = req.query;
            const page = Math.round(Math.max(req.query.page * 1, 1)) - 1;
            const perPage = Math.round(Math.max(req.query.per_page * 1, 1));
            const topics = await Topic.find({name: new RegExp(req.query.name)})
                .limit(perPage)
                .skip(page * perPage);
            return res.status(200).json({success: true, topics: topics});
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
        const topic = await Topic.findById(req.params.id).select(selectFields);
        if (topic) return res.status(200).json(topic);
        return res.status(404).json({result: "can't find Topic id = " + req.params.id});
    }

    async create(req, res) {
        const topic = await new Topic({
            name: req.body.name,
            avatar_url: req.body.avatar_url,
            introduction: req.body.introduction
        }).save();
        if (topic) return res.status(200).json(topic);
        return res.status(400).json({created: "fail to create new user"});
    }

    async update(req, res) {
        const user = await User.findByIdAndUpdate(req.params.id, req.body);
        if (user) return res.status(200).json(user); // return the old user
        return res.status(400).json({updated: false});
    }

    async listPosts(req, res) {
        const posts = await Post.find({topic: req.params.id});
        return res.status(200).json({success: true, posts: posts});
    }
}

module.exports = new TopicController();
