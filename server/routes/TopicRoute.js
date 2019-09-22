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
const {authAdmin} = require('../middleware/authUser');

router.get('/', find);
router.post('/', authAdmin, create); // administrator has right to create user
router.get('/:id', checkTopicExist, findById);
router.patch('/:id', authAdmin, checkTopicExist, update); // normal user can update own information
router.get('/:id/users', listPosts);

module.exports = router;
