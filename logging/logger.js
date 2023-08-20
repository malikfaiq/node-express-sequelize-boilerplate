const winston = require('winston');

class Logger {
	constructor() {
		console.log('Logger constructor called'); // Add this line
		this.logger = winston.createLogger({
			level: 'info',
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.printf(({ timestamp, level, message }) => {
					return `${timestamp} [${level.toUpperCase()}]: ${message}`;
				})
			),
			transports: [
				new winston.transports.Console(),
				new winston.transports.File({ filename: 'app-logs.log' })
			]
		});
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new Logger();
		}
		return this.instance;
	}

	info(message) {
		this.logger.info(message);
	}

	error(message) {
		this.logger.error(message);
	}
}

module.exports = Logger.getInstance();
