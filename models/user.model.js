const { DataTypes, UUIDV4, where } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const User = sequelize.define(
	'User',
	{
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	},
	{
		hooks: {
			beforeCreate: async function (user) {
				console.log(user);
				if (user.changed('password')) {
					user.password = await bcrypt.hash(user.password, 8);
				}
			}
		}
	}
);

User.associate = (models) => {
	User.hasMany(models.Note, { foreignKey: 'userId' });
};

/**
 * Check if email is taken
 * @param {string} username - The user's username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
User.isUsernameTaken = async function (username) {
	const user = await User.findOne({ where: { username: username } });
	return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
User.prototype.isPasswordMatch = async function (password) {
	const user = this;
	return bcrypt.compare(password, user.password);
};

module.exports = User;
