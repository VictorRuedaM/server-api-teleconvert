import { Request, Response, Router } from "express";
import { handleErrors } from "../../../shared/utils/handleErrors";
import { messageController } from "../controllers/message.controller";
import { verifyKey } from "../../../shared/middlewares/api-key-verify/verifyKey";
import { validator } from "../../../shared/middlewares/validators/validatorsBody";


export const router = Router();

//!delete this
router.get('/', (req: Request, res: Response) => {
  // res.status(200).json({message: 'Ok!!'})
  handleErrors.serverError('get', 'Error in get')
  handleErrors.httpErrors(req, res, 401)
})

router.get('/', verifyKey, messageController.getMessagesController);


router.post('/', verifyKey, validator.messageValidator, messageController.createMessageController);



router.delete('/', verifyKey, messageController.deleteMessageDBController);
