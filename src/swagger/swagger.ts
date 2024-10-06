import swaggerJSDoc, { OAS3Definition, OAS3Options } from "swagger-jsdoc";


const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "DOCUMENTACIÓN API TELECONVERT",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3002/teleconvert/api/v1",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
    schemas: {
      chat: {
        type: "object",
        required: ["base", "target", "amount"],
        properties: {
          base: {
            type: "string",
            example: "COP",
          },
          target: {
            type: "string",
            example: "USD",
          },
          amount: {
            type: "number",
            example: "10000",
          },
        },
      },
     
    },
  },
};


const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/modules/message/routes/message.routes.ts"],
};

export default swaggerJSDoc(swaggerOptions);