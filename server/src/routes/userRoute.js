const express = require('express');
const router = express.Router();
const userController = require('../controllers/usercontroller');


router.post('/login', userController.loginUser);
router.post("/add-user", userController.addUser);
router.get("/get-all-user", userController.getAllUser);

module.exports = router;
