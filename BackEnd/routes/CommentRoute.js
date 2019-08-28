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
} = require('../controllers/CommentController');
const {authUser} = require('../auth/authUser');

router.get('/:postId/comments/', find);
router.post('/:postId/comments/', authUser, create);
router.get('/:postId/comments/:id', checkCommentExist, checkCommentator,findById);
router.patch('/:postId/comments/:id', authUser, checkCommentExist, checkCommentator,update);
router.delete('/:postId/comments/:id',authUser,checkCommentExist,checkCommentator,del);

module.exports = router;
