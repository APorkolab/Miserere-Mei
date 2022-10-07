const express = require('express');
const router = express.Router();
const Place = require('../../models/place');

const controller = require('../base/controller')(Place);


router.get('/:location', (req, res, next) => {
	return controller.findOnebyPlaceName(req, res, next);
});

module.exports = router;