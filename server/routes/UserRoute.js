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
    findPopularUserByPostsNumber,
    checkUsernameAndEmailAndSendEmail,
    alterPassword
} = require('../controllers/UserController');
const {authUser, authAdmin} = require('../middleware/authUser');
const validate = require('../middleware/validator');
const {body} = require('express-validator');


router.get('/popular/users', findPopularUserByPostsNumber);
router.post('/register/', validate([
    body('username')
        .isLength({min: 4, max: 16})
        .not()
        .isEmpty(),
    body('email')
        .isEmail(),
    body('password')
        .isLength({min: 6, max: 16})
]), register);
router.post('/login/', validate([
    body('username')
        .isLength({min: 4, max: 16})
        .not()
        .isEmpty(),
    body('password')
        .isLength({min: 6, max: 16})
]), login); // same as register, no need for any middleware process
router.get('/verify_email/:username/:token', verifyEmail);
router.get('/', find);
router.post('/', validate([
    body('username')
        .isLength({min: 4, max: 16})
        .not()
        .isEmpty(),
    body('email')
        .isEmail(),
    body('password')
        .isLength({min: 6, max: 16})
]), authAdmin, create); // administrator has right to create user
router.get('/:id', checkUserExist, findById);
router.patch('/:id', validate([
    body('username')
        .optional()
        .isLength({min: 4, max: 16}),
    body('email')
        .optional()
        .isEmail(),
    body('password')
        .optional()
        .isLength({min: 6, max: 16})
]), authUser, checkUserExist, update); // normal user can update own information
router.post('/forgetPassword',validate([
    body('email')
        .isEmail(),
    body('username')
        .isLength({min: 4, max: 16})
        .not()
        .isEmpty(),
]),checkUsernameAndEmailAndSendEmail);
router.post('/verify/alterPassword',validate([
    body('verificationCode')
        .isNumeric(),
    body('password')
        .isLength({min: 6, max: 16}),
    body('username')
        .isLength({min: 4, max: 16})
        .not()
        .isEmpty(),
]),alterPassword);

module.exports = router;
