const mongoose = require('mongoose');
const AllPlaceSchema = mongoose.Schema({
	location: {
		type: String,
		required: true
	},
	narrationZoneText: {
		type: String,
		required: true
	},
	opponentName: {
		type: String,
	},
	decision1: {
		type: String,
		required: true
	},
	decision2: {
		type: String,
	},
	decision3: {
		type: String,
	},
	decision4: {
		type: String,
	},
	furtherLocation1: {
		type: String,
		required: true
	},
	furtherLocation2: {
		type: String,
	},
	furtherLocation3: {
		type: String,
	},
	furtherLocation4: {
		type: String,
	},
});

module.exports = mongoose.model('AllPlace', AllPlaceSchema);