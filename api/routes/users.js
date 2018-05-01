const express = require("express");
const router = express.Router();
const checkAuth = require('../../middleware/authCheck');

const userController = require('../../controllers/users');
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.delete('/:userID',checkAuth, userController.delete_user)
router.get('/',checkAuth, userController.get_users);

module.exports = router;