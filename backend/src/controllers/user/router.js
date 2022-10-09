const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const controller = require('../base/controller')(User);


// Create
router.post('/', (req, res, next) => {
	return controller.create(req, res, next);
});

//Read
router.get('/', (req, res, next) => {
	return controller.findAll(req, res, next);
});

router.get('/select/:id', (req, res, next) => {
	return controller.findOneById(req, res, next);
});

// Update
router.put('/select/:id', (req, res, next) => {
	return controller.update(req, res, next);
});

router.patch('/select/:id', (req, res, next) => {
	return controller.update(req, res, next);
});

// Delete 
router.delete('/select/:id', (req, res, next) => {
	return controller.delete(req, res, next);
});

module.exports = router;