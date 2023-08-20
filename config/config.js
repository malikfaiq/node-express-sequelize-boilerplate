const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

let file_path = '../.env';
if (process.env.NODE_ENV == 'test') {
	file_path = '../test.env';
}

dotenv.config({ path: path.join(__dirname, file_path) });

const envVarsSchema = Joi.object()
	.keys({
		NODE_ENV: Joi.string()
			.valid('production', 'development', 'test')
			.required(),
		PORT: Joi.number().default(3000),
		DB_USERNAME: Joi.string().required().description('Database username'),
		DB_PASSWORD: Joi.string().required().description('Database password'),
		DB_NAME: Joi.string().description('Database name'),
		DB_HOSTNAME: Joi.string().default('localhost').description('database host'),
		DB_DIALECT: Joi.string().default('mysql').description('database host'),
		DB_PORT: Joi.number().default(3306).description('Database port')
	})
	.unknown();

const { value: envVars, error } = envVarsSchema
	.prefs({ errors: { label: 'key' } })
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	env: envVars.NODE_ENV,
	port: envVars.PORT,
	database: {
		username: envVars.DB_USERNAME,
		database: envVars.DB_NAME,
		password: envVars.DB_PASSWORD,
		host: envVars.DB_HOSTNAME,
		port: envVars.DB_PORT,
		dialect: envVars.DB_DIALECT
	}
};
