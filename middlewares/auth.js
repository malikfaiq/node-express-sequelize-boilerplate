const passport = require('../config/passport.js');
const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');
const logger = require('../logging/logger');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
	if (err || info || !user) {
		return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
	}
	req.user = user;
	resolve();
};

const jwtAuth = () => async (req, res, next) => {
	return new Promise((resolve, reject) => {
		passport.authenticate(
			'jwt',
			{ session: false },
			verifyCallback(req, resolve, reject)
		)(req, res, next);
	})
		.then(() => next())
		.catch((err) => next(err));
};

const localAuth = () => async (req, res, next) => {
	return new Promise((resolve, reject) => {
		passport.authenticate(
			'local',
			{ session: false },
			verifyCallback(req, resolve, reject)
		)(req, res, next);
	})
		.then(() => next())
		.catch((err) => next(err));
};

module.exports = {
	jwtAuth,
	localAuth
};
