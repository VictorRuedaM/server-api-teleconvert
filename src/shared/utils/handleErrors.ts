import { Request, Response, NextFunction } from 'express';
import { validationResult, Result } from 'express-validator';
import colors from 'colors';

class HandleErrors {

  public serverError(method: string, error: string){
    console.log(colors.bgRed.black(` *** Server Error  *** [ METHOD: ${method} -- ERROR: ${error} ] `))
  }

  public validatorErrors(req: Request, res: Response, next: NextFunction){
    const errors: Result = validationResult(req);

    if (!errors.isEmpty()) {
      
      const firstErrorMessage = errors.array()[0].msg;
      this.serverError('validatorErrors', `${firstErrorMessage}`);
      res.status(400).json({message: 'Bad Request', error: firstErrorMessage});
      return;
    }
    next();
  }


  public httpErrors(req: Request, res: Response, status: number){
    if(status === 401)res.status(status).json({message: 'Unauthorized'});
    if(status === 500)res.status(status).json({message: 'An internal server error has occurred'});

  }

}


export const handleErrors = new HandleErrors();