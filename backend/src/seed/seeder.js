const fsp = require('fs').promises;
const mongoose = require('mongoose');
const place = require('../models/place');

const User = require('../models/user');
const UsersList = require('./users.json');
const {
	once
} = require('events');
const player = require('../models/player');


// mongoose.connection.dropDatabase();


const AtlasUploader = async (model, fileName) => {
	try {
		const exists = await model.find().count();
		if (!exists) {
			throw new Error();
		}
	} catch (e) {
		const source = await fsp.readFile(
			`./src/seed/${fileName}.json`,
			'utf8'
		);
		const list = JSON.parse(source);
		if (model && model.insertMany) {
			await model.insertMany(list, {
				limit: 100
			});
		}

	}
};

(async () => {
	// AtlasUploader(place, 'places');
	// AtlasUploader(player, 'player');

	// UsersList.forEach(async user => {
	// 	const newUser = new User(user);
	// 	await newUser.save();
	// })
	// console.log("Every file has been processed by the seeder!");

})();