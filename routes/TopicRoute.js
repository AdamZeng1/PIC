const express = require('express');
const router = express.Router();
const {
    checkTopicExist,
    find,
    findById,
    create,
    update,
    listPosts
} = require('../controllers/TopicController');
const {authUser} = require('../auth/authUser');

router.get('/', find);
router.post('/', authUser, create); // administrator has right to create user
router.get('/:id', checkTopicExist, findById);
router.patch('/:id', authUser, checkTopicExist, update); // normal user can update own information
router.get('/:id/posts', listPosts);

module.exports = router;
