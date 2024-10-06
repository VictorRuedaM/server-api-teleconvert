import { MessageDataDB } from "./messageServices.interface";



export interface DBQueriesInterface {
  getMessagesDBQuery(): Promise<MessageDataDB[] | undefined>;
  createMessageDBQuery(data: MessageDataDB): Promise<string | undefined>;
  deleteMessagesDBQuery(): Promise<void>;
}