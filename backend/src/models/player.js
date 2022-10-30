const mongoose = require('mongoose');
const PlayerSchema = mongoose.Schema({
	protagonistHealthPoint: {
		type: Number,
		required: true,
		default: 100
	},
	playerAmmo: {
		type: Number,
		default: 15
	},
	currentWeaponName: {
		type: String,
		required: true,
		default: 'Beretta 92FS'
	},
	currentWeaponMinDamage: {
		type: Number,
		required: true,
		default: 2
	},
	currentWeaponMaxDamage: {
		type: Number,
		required: true,
		default: 6
	},
});

module.exports = mongoose.model('Player', PlayerSchema);