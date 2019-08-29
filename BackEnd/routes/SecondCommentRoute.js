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
} = require('../controllers/SecondCommentController');
const {authUser} = require('../auth/authUser');

router.get('/:postId/comments/:commentId/comments', find);
router.post('/:postId/comments/:commentId/comments', authUser, create);
router.get('/:postId/comments/:commentId/comments/:id', checkSecondCommentExist, findById);
router.patch('/:postId/comments/:commentId/comments/:id', authUser, checkSecondCommentExist, checkCommentator, update);
router.delete('/:postId/comments/:commentId/comments/:id', authUser, checkSecondCommentExist, checkCommentator, del);

module.exports = router;
