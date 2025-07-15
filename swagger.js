// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Poll API",
      version: "1.0.0",
      description: "API documentation for School Election Management System"
    },
    servers: [
      {
        url: "http://localhost:5000",
      }
    ],
  },
  apis: ["./routes/*.js"], // path to your route files
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
