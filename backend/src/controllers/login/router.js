const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const {
	User
} = require('../../models');
const jwt = require('jsonwebtoken');

// Post
router.post('/', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;

	try {
		const fMember = await User.findOne({
			where: {
				email
			}
		});

		if (!fMember) {
			return res.status(404).json({
				error: 'This user does not exist'
			});
		}

		// Aszinkron jelszó ellenőrzés
		const valid = await bcrypt.compare(password, fMember.password);

		if (valid) {
			const accessToken = jwt.sign({
					email: fMember.email,
					role: fMember.role
				},
				'IWishICouldTellYouThatAndyFoughtTheGoodFight', {
					expiresIn: '1h',
				}
			);

			res.json({
				accessToken,
				user: {
					...fMember.get(),
					password: ''
				},
			});
		} else {
			return res.sendStatus(401);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;