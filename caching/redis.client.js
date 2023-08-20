const redis = require('redis');
const logger = require('../logging/logger');

let client;

(async () => {
	client = redis.createClient({
		socket: {
			host: 'redis',
			port: 6379
		}
	});
	client.on('error', (error) => console.error(`Error : ${error}`));
	await client.connect();
	console.log('redis client has been connected');
})();

// Middleware to check cache before proceeding to the route handler
const checkCache = async (req, res, next) => {
	// Event handler when an error occurs
	const key = req.originalUrl;
	logger.info('Checking Cache');
	const data = await client.get(key);
	logger.info(data, 'data');
	if (data != null) {
		res.send({ fromCache: true, data: JSON.parse(data) });
	} else {
		next();
	}
};

// Middleware to store data in cache
const cacheData = (req, data) => {
	const key = req.originalUrl;
	const stringifyData = JSON.stringify(data);
	client.set(key, stringifyData, {
		EX: 5,
		NX: true
	}); // Cache data for 5 seconds to check quick results.
};

module.exports = { checkCache, cacheData };
