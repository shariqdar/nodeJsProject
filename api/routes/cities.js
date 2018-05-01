const express = require('express');
const router = express.Router();
const cityController = require('../../controllers/cities');

router.get('/:pageNo/:searchQuery', cityController.getCities);
router.post('/', cityController.postCity);

module.exports = router;