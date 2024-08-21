const express = require('express');
const router = express.Router();
const {
	User
} = require('../../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;

	try {
		const user = await User.findOne({
			where: {
				email
			}
		});

		if (!user) {
			return res.status(404).json({
				error: 'User does not exist'
			});
		}

		const validPassword = await bcrypt.compare(password, user.password);
		if (!validPassword) {
			return res.status(401).json({
				error: 'Invalid password'
			});
		}

		const accessToken = jwt.sign({
				id: user.id,
				email: user.email,
				role: user.role
			},
			'IWishICouldTellYouThatAndyFoughtTheGoodFight', {
				expiresIn: '1h'
			}
		);

		return res.json({
			accessToken,
			user: {
				id: user.id,
				email: user.email,
				firstName: user.firstName,
				lastName: user.lastName,
				role: user.role,
			},
		});
	} catch (error) {
		return res.status(500).json({
			error: 'Internal server error'
		});
	}
});

module.exports = router;