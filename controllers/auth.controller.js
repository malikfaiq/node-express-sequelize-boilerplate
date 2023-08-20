const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const logger = require('../logging/logger');
const { authService, userService, tokenService } = require('../services');

const register = catchAsync(async (req, res) => {
	try {
		const user = await userService.createUser(req.body);
		res.status(httpStatus.CREATED).send({ user });
	} catch (error) {
		logger.error(error);
		res
			.status(httpStatus.BAD_REQUEST)
			.send({ message: 'Username already taken' });
	}
});

const login = catchAsync(async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await authService.loginUserWithUsernameAndPassword(
			username,
			password
		);
		const token = jwt.sign({ userId: user.id }, 'testingkey', {
			expiresIn: '1h'
		});
		res.send({ user, token });
	} catch (error) {
		logger.error(error);
		res
			.status(httpStatus.BAD_REQUEST)
			.send({ message: 'Incorrect email or password' });
	}
});

module.exports = {
	register,
	login
};
