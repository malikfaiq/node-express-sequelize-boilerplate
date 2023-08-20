const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/apiError');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
	if (await User.isUsernameTaken(userBody.username)) {
		throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
	}
	return User.create(userBody);
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
	return User.findById(id);
};

/**
 * Get user by username
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByUsername = async (username) => {
	return User.findOne({ where: { username: username } });
};

module.exports = {
	createUser,
	getUserById,
	getUserByUsername
};
