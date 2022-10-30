const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

//Post
router.post('/', async (req, res, next) => {
	const {
		email,
		password
	} = req.body;

	const fMember = await User.findOne({
		email
	});

	if (!fMember) {
		res.sendStatus(404);
		return res.json({
			error: 'This user does not exist'
		});
	}

	const valid = fMember.verifyPasswordSync(password);
	if (valid) {
		const accessToken = jwt.sign(
			// _id: fMember._id,
			// email: fMember.email,
			// role: fMember.role,
			{
				email: fMember.email,
				role: fMember.role
			}, 'IWishICouldTellYouThatAndyFoughtTheGoodFight', {
				expiresIn: '1h',
			});

		res.json({
			// success: true,
			accessToken,
			user: {
				...fMember._doc,
				password: ''
			},
		});
	} else {
		return res.sendStatus(401);
	}
});

module.exports = router;