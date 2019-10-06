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

router.get('/user/:userId', checkUserExist, findByUserId);
router.get('/', find);
router.post('/', authUser, create);
router.get('/threads/posts', findThreadPostByCommentsNumber);
router.get('/:id', checkPostExist, findById);
router.patch('/:id', authUser, checkPostExist, update); // normal user can update own information
router.delete('/:id',authUser,checkPostExist,del);

module.exports = router;
