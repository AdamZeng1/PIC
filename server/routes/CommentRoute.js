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
    checkPostExist,
    findByUserId
} = require('../controllers/CommentController');
const {checkUserExist} = require('../controllers/UserController');
const {authUser} = require('../middleware/authUser');

const validate = require('../middleware/validator');
const {body} = require('express-validator');

router.get('/user/:userId', checkUserExist, findByUserId);
router.get('/:postId/comments/', checkPostExist, find);
router.post('/:postId/comments/',validate([
    body("image_url")
        .exists(),
    body("type")
        .exists(),
]) ,authUser, checkPostExist, create);
router.get('/:postId/comments/:id', checkPostExist, checkCommentExist, findById);
router.patch('/:postId/comments/:id', validate([
    body("image_url")
        .exists(),
    body("type")
        .optional()
        .exists(),
]),authUser, checkPostExist, checkCommentExist, checkCommentator, update);
router.delete('/:postId/comments/:id', authUser, checkPostExist, checkCommentExist, checkCommentator, del);

module.exports = router;
