import { NextFunction, Request, Response } from "express";
import { handleErrors } from "../../utils/handleErrors";


const API_KEY = process.env.SERVER_API_KEY;

export const verifyKey = async (req: Request, res: Response, next: NextFunction) => {
  let key: string = req.headers['authorization'] || '';
  key = key.slice(7);
  if(key !== API_KEY){
    handleErrors.serverError('verifyKey', '401 -- Unauthorized')
    handleErrors.httpErrors(res, 401)
    return;
  }
  next();
}