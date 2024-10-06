import { Request, Response, Router } from "express";
import { handleErrors } from "../../../shared/utils/handleErrors";


export const router = Router();


router.get('/', (req: Request, res: Response) => {
  // res.status(200).json({message: 'Ok!!'})
  handleErrors.serverError('get', 'Error in get')
  handleErrors.httpErrors(req, res, 401)
})