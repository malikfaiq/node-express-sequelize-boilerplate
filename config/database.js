const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('note_taking_db', 'root', 'testing', {
	host: 'db',
	dialect: 'mysql'
});

module.exports = sequelize;
