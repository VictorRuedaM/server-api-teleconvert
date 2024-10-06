import express from 'express';
import { router as messageModule } from '../modules/message/routes/message.routes';



export const route = (app: express.Application) => {
  app.use('/teleconvert/api/v1', messageModule)
}