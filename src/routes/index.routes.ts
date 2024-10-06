import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../swagger/swagger';
import { router as messageModule } from '../modules/message/routes/message.routes';



export const route = (app: express.Application) => {
  app.use('/teleconvert/api/v1', messageModule);
  app.use('/teleconvert/api/v1/swagger.api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
}