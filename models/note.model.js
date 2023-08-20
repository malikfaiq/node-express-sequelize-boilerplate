const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user.model'); // Import the Note model

const Note = sequelize.define('Note', {
	id: {
		allowNull: false,
		primaryKey: true,
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4
	},
	type: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	text: {
		type: DataTypes.TEXT,
		allowNull: false
	},
	userId: {
		type: DataTypes.UUID, // Assuming UUID for user ID
		allowNull: false
	}
});

Note.belongsTo(User, { foreignKey: 'userId' });

module.exports = Note;
