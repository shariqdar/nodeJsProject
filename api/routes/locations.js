const express = require('express');
const router = express.Router();
const checkAuth = require('../../middleware/authCheck');
const locationController = require('../../controllers/locations');

router.post('/',checkAuth, locationController.saveLocation);
router.get('/', locationController.getLocations);
router.delete('/:ID', locationController.deleteLocations);

module.exports = router;