const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
	config.database.database,
	config.database.username,
	config.database.password,
	config.database
);
module.exports = sequelize;
