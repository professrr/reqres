const express = require('express');
const reqresController = require('../controllers/reqresController');
const router = express.Router();

router.get('/user', reqresController.getUsers)
router.post('/user', reqresController.createUser)
router.post('/', reqresController.activateCrawler)

module.exports = router;