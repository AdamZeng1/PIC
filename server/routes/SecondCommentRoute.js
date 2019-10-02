const express = require('express');
const router = express.Router();
const {
    checkSecondCommentExist,
    find,
    findById,
    create,
    update,
    del,
    checkCommentator,
    checkCommentExist,
    checkPostExist
} = require('../controllers/SecondCommentController');
const {authUser} = require('../middleware/authUser');

router.get('/:postId/comments/:commentId/comments', checkPostExist, checkCommentExist, find);
router.post('/:postId/comments/:commentId/comments', authUser, checkPostExist, checkCommentExist, create);
router.get('/:postId/comments/:commentId/comments/:id', checkPostExist, checkCommentExist, checkSecondCommentExist, findById);
router.patch('/:postId/comments/:commentId/comments/:id', authUser, checkPostExist, checkCommentExist, checkSecondCommentExist, checkCommentator, update);
router.delete('/:postId/comments/:commentId/comments/:id', authUser, checkPostExist, checkCommentExist, checkSecondCommentExist, checkCommentator, del);

module.exports = router;
