import { Request, Response } from "express";
import { handleErrors } from "../../../shared/utils/handleErrors";
import { messageService } from "../services/message.service";

class MessageController {

  public async getMessagesController(req: Request, res: Response){
    try {
      const data = await messageService.getMessagesService();
      if(data === 'error') handleErrors.httpErrors(res, 500);
      else res.status(200).json(data)
    } catch (error) {
      handleErrors.serverError('getMessagesController', `${error}`);
      handleErrors.httpErrors(res, 500);
    }
  }

  public async createMessageController(req: Request, res: Response){
    try {
      const{base, target, amount} = req.body

      const result = await messageService.createMessageService(base, target, amount);
      if(result !== 'error') res.status(200).json({status: 'Ok', result});
      else handleErrors.httpErrors(res, 500);
    } catch (error) {
      handleErrors.serverError('createMessageController', `${error}`);
      handleErrors.httpErrors(res, 500);
    }
  }

  public async deleteMessageDBController(req: Request, res: Response){
    try {
      await messageService.deleteMessagesDBService();
      
      res.status(200).json({status: 'Ok'});
    } catch (error) {
      handleErrors.serverError('deleteMessageDBController', `${error}`);
      handleErrors.httpErrors(res, 500);
    }
  }



}

export const messageController = new MessageController();