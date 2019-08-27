const express = require('express');
const router = express.Router();
const {
    checkPostExist,
    find,
    findById,
    create,
    update,
} = require('../controllers/PostController');
const {authUser} = require('../auth/authUser');

router.get('/', find);
router.post('/', authUser, create); // administrator has right to create user
router.get('/:id', checkPostExist, findById);
router.patch('/:id', authUser, checkPostExist, update); // normal user can update own information

module.exports = router;
