import { Request, Response, Router } from "express";
import { handleErrors } from "../../../shared/utils/handleErrors";
import { messageController } from "../controllers/message.controller";
import { verifyKey } from "../../../shared/middlewares/api-key-verify/verifyKey";
import { validator } from "../../../shared/middlewares/validators/validatorsBody";


export const router = Router();

//!delete this
// router.get('/', (req: Request, res: Response) => {
//   // res.status(200).json({message: 'Ok!!'})
//   handleErrors.serverError('get', 'Error in get')
//   handleErrors.httpErrors(res, 401)
// })


/**
 * @openapi
 * /:
 *    get:
 *      tags:
 *        - Teleconvert
 *      summary: "Chats"
 *      description: Devuelve todos los chats almacenados en la DB. 
 *      responses:
 *        '200':
 *          description: Retorna un array con la colección de objetos.
 *          content:
 *            application/json:
 *                    schema:
 *                        $ref: "#/components/schemas/message"
 *                        type: object
 *                        properties:
 *                            id: 
 *                               type: number                        
 *                            base: 
 *                               type: string  
 *                            target: 
 *                               type: string
 *                            amount: 
 *                               type: number
 *                            converted_valude:
 *                               type: string
 *                            date:
 *                               type: string
 * 
 *        
 *        '401': 
 *          description: No autorizado
 *        '500':
 *          description: Error de servidor.
 *      security:
 *       - bearerAuth: []
 */

router.get('/', verifyKey, messageController.getMessagesController);





/**
 * @openapi
 * /:
 *    post:
 *      tags:
 *        - Teleconvert
 *      summary: "Chats"
 *      description: Convierte el valor de la divisa escogida y guarda la información del chat en la DB.
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/chat"
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la DB.
 *        '401': 
 *          description: No autorizado
 *        '500':
 *          description: Error de servidor.
 *      security:
 *       - bearerAuth: []
 */

router.post('/', verifyKey, validator.messageValidator, messageController.createMessageController);


/**
 * @openapi
 * /:
 *    delete:
 *      tags:
 *        - Teleconvert
 *      summary: "Chats"
 *      description: Elimina todos los chats almacenados en la DB.
 *      responses:
 *        '200':
 *          description: Retorna un status Ok si la eliminación fue exitosa.
 *        '401': 
 *          description: No autorizado
 *        '500':
 *          description: Error de servidor.
 *      security:
 *       - bearerAuth: []
 */
router.delete('/', verifyKey, messageController.deleteMessageDBController);
