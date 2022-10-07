const express = require('express');
const router = express.Router();
const Place = require('../../models/place');

const controller = require('../base/controller')(Place);


// Create
router.get('/:location', (req, res, next) => {
	return controller.findOnebyPlaceName(req, res, next);
});

router.post('/', (req, res, next) => {
	return controller.create(req, res, next);
});

//Read
router.get('/', (req, res, next) => {
	return controller.findAll(req, res, next);
});


router.get('/:id', (req, res, next) => {
	return controller.findOneById(req, res, next);
});


// Update
router.put('/:id', (req, res, next) => {
	return controller.update(req, res, next);
});

router.patch('/:id', (req, res, next) => {
	return controller.update(req, res, next);
});

// Delete 
router.delete('/:id', (req, res, next) => {
	return controller.delete(req, res, next);
});

module.exports = router;