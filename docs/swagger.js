const swaggerJSDoc = require('swagger-jsdoc');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Note Taking App API',
			version: '1.0.0',
			description: 'API documentation for the Note Taking App'
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'Bearer'
				}
			}
		},
		security: [
			{
				bearerAuth: []
			}
		]
	},
	apis: ['./routes/v1/*.js'] // Path to the API routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
