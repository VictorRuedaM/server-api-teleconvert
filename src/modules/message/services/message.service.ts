import axios, { AxiosInstance } from 'axios';
import { AxiosResponseInterface } from "../interfaces/axiosResponse.interface";
import moment from "moment";
import { handleErrors } from "../../../shared/utils/handleErrors";
import { messageDBQueries } from "../db/messageQueryDB";
import { MessageDataDB, MessageServicesInterface } from "../interfaces/messageServices.interface";

const EXTERNAL_API = process.env.API_EXCHANGERATE_URL;

class MessageService implements MessageServicesInterface {

  public async getMessagesService(): Promise<MessageDataDB[] | string | undefined>{
    try {
      const data: MessageDataDB[] | undefined = await messageDBQueries.getMessagesDBQuery();
      if(data)return data
      else return 'error';
    } catch (error) {
      handleErrors.serverError('getMessagesService', `${error}`);
    }
  }

  public async createMessageService(base: string, target: string, amount: number): Promise<string | MessageDataDB | undefined>{
    const axiosMethod: AxiosInstance = axios;
    let result: number;
    try {
      const {data}  = await axiosMethod.get<AxiosResponseInterface>(`${EXTERNAL_API}${base}/${target}/${amount}`);
      const {conversion_result} = data;

      if(base === 'COP'){
        result = Math.trunc(conversion_result * 100) / 100;

      }else{
        result = Math.trunc(conversion_result / 1);
      }

      const dataDB: MessageDataDB = {
        base, 
        target, 
        amount, 
        result
      }

      const dataSave = await this.saveMessageDBService(dataDB);
      if(dataSave === 'error') return 'error';
      return dataSave;
      
    } catch (error) {
      handleErrors.serverError('createMessageService', `${error}`);
    }
  }

  public async saveMessageDBService(data: MessageDataDB): Promise<string | MessageDataDB | undefined>{
    const date = moment();
    const dateFormat = date.format('DD-MM-YYYY HH:mm');
    const message: MessageDataDB = {
      ...data,
      date: dateFormat,
    }
    
    try {
      const result = await messageDBQueries.createMessageDBQuery(message);
      if(result === 'error') return 'error';
      return message;
    } catch (error) {
      handleErrors.serverError('saveMessageDBService', `${error}`);
    }
  }

  public async deleteMessagesDBService(): Promise<void>{
    try {
      await messageDBQueries.deleteMessagesDBQuery();
      return;
    } catch (error) {
      handleErrors.serverError('deleteMessagesDBService', `${error}`);
    }
  }

}


export const messageService = new MessageService();