const mongoose = require('mongoose');
const PlayerSchema = mongoose.Schema({
	protagonistHealthPoint: {
		type: Number,
		required: true
	},
	playerAmmo: {
		type: Number,
	},
	currentWeaponName: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Player', PlayerSchema);