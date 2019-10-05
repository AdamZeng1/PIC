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
    checkPostExist,
    findByUserId
} = require('../controllers/SecondCommentController');
const {checkUserExist} = require('../controllers/UserController');
const {authUser} = require('../middleware/authUser');

router.get('/secondComments/user/:userId', checkUserExist, findByUserId);
router.get('/:postId/comments/:commentId/comments', checkPostExist, checkCommentExist, find);
router.post('/:postId/comments/:commentId/comments', authUser, checkPostExist, checkCommentExist, create);
router.get('/:postId/comments/:commentId/comments/:id', checkPostExist, checkCommentExist, checkSecondCommentExist, findById);
router.patch('/:postId/comments/:commentId/comments/:id', authUser, checkPostExist, checkCommentExist, checkSecondCommentExist, checkCommentator, update);
router.delete('/:postId/comments/:commentId/comments/:id', authUser, checkPostExist, checkCommentExist, checkSecondCommentExist, checkCommentator, del);

module.exports = router;
