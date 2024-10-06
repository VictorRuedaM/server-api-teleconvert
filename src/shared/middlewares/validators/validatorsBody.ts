import { body } from 'express-validator';
import { handleErrors } from '../../utils/handleErrors';


const messageValidator = [

  body('base')
    .notEmpty()
    .withMessage('Base is required')
    .isString()
    .withMessage('Base must be a string')
    .isLength({ min: 3, max: 3 })
    .withMessage('Base must be 3 characters'),
  body('target')
    .notEmpty()
    .withMessage('Target is required')
    .isString()
    .withMessage('Target must be a string')
    .isLength({ min: 3, max: 3 })
    .withMessage('Target must be  3'),
  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a string')
    .isLength({ min: 1, max: 20 })
    .withMessage('Amount must be between 1 and 20 characters'),
  handleErrors.validatorErrors,

]

export const validator = {messageValidator}