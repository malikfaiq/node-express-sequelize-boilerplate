'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const sequelize = require('../config/database');
const db = {};

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.js' &&
			file.indexOf('.test.js') === -1
		);
	})
	.forEach((file) => {
		const Model = require(path.join(__dirname, file));
		const modelInstance = new Model(sequelize, Sequelize.DataTypes);
		db[Model.name] = modelInstance;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
module.exports.User = require('./user.model');
module.exports.Note = require('./note.model');
