const express = require('express');
const router = express.Router();
const {
    checkUserExist,
    find,
    findById,
    create,
    update,
    register,
    login,
    verifyEmail,
    findPopularUserByPostsNumber
} = require('../controllers/UserController');
const {authUser, authAdmin} = require('../middleware/authUser');

router.get('/popular/users', findPopularUserByPostsNumber);
router.post('/register/', register);
router.post('/login/', login); // same as register, no need for any middleware process
router.get('/verify_email/:username/:token', verifyEmail);
router.get('/', find);
router.post('/', authAdmin, create); // administrator has right to create user
router.get('/:id', checkUserExist, findById);
router.patch('/:id', authUser, checkUserExist, update); // normal user can update own information

module.exports = router;
