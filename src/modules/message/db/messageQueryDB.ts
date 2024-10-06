import { pool } from '../../../database-connection/database.connection';
import { handleErrors } from '../../../shared/utils/handleErrors';
import { DBQueriesInterface } from '../interfaces/dbQueries.interface';
import { MessageDataDB } from '../interfaces/messageServices.interface';

class MessageDBQueries implements DBQueriesInterface {

  public async getMessagesDBQuery(): Promise<MessageDataDB[] | undefined>{
    try {
      const result = await pool.query('select * from chat.chats');
      return result.rows;
    } catch (error) {
      handleErrors.serverError('', `${error}`);
      return;
    }
  }

  public async createMessageDBQuery(data: MessageDataDB): Promise<string | undefined>{
    const {base, target, amount, result, date} = data;
    try {
      const queryResult = await pool.query("insert into chat.chats(base, target, amount, converted_value, date) values($1, $2, $3, $4, $5)", [base, target, amount, result, date])
    } catch (error) {
      handleErrors.serverError('', `${error}`);
      return 'error';
    }
  }

  public async deleteMessagesDBQuery(): Promise<void>{
    try {
      await pool.query('delete from chat.chats');
      return;
    } catch (error) {
      handleErrors.serverError('', `${error}`);
      return;
    }
  }


}

export const messageDBQueries = new MessageDBQueries();