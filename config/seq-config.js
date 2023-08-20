const fs = require('fs');
const config = require('./config');

module.exports = {
	development: {
		...config.database
	},
	test: {
		...config.database
	},
	production: {
		...config.database
	}
};
