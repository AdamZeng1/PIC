const express = require('express');
const router = express.Router();
const {
    checkCommentExist,
    find,
    findById,
    create,
    update,
    del,
    checkCommentator,
    checkPostExist
} = require('../controllers/CommentController');
const {authUser} = require('../middleware/authUser');

router.get('/:postId/comments/', checkPostExist, find);
router.post('/:postId/comments/', authUser, checkPostExist, create);
router.get('/:postId/comments/:id', checkPostExist, checkCommentExist, findById);
router.patch('/:postId/comments/:id', authUser, checkPostExist, checkCommentExist, checkCommentator, update);
router.delete('/:postId/comments/:id', authUser, checkPostExist, checkCommentExist, checkCommentator, del);

module.exports = router;
