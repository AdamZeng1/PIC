const express = require('express');
const router = express.Router();
const {
    checkPostExist,
    find,
    findById,
    create,
    update,
    findThreadPostByCommentsNumber,
    findByUserId,
    del
} = require('../controllers/PostController');
const {checkUserExist} = require('../controllers/UserController');
const {authUser} = require('../middleware/authUser');

const validate = require('../middleware/validator');
const {body} = require('express-validator');

router.get('/user/:userId', checkUserExist, findByUserId);
router.get('/', find);
router.post('/', validate([
    body("title")
        .exists(),
    body("image_url")
        .exists(),
    body("type")
        .exists(),
]),authUser, create);
router.get('/threads/posts', findThreadPostByCommentsNumber);
router.get('/:id', checkPostExist, findById);
router.patch('/:id', validate([
    body("image_url")
        .exists()
]),authUser, checkPostExist, update); // normal user can update own information
router.delete('/:id',authUser,checkPostExist,del);

module.exports = router;
