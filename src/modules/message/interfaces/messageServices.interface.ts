

export interface MessageServicesInterface {

  getMessagesService(): Promise<MessageDataDB[] | string | undefined>;
  createMessageService(base: string, target: string, amount: number): Promise<string | MessageDataDB | undefined>;
  saveMessageDBService(data: MessageDataDB): Promise<string | MessageDataDB | undefined>;
  deleteMessagesDBService(): void;
}


export interface MessageDataDB {
  base: string; 
  target: string; 
  amount: number; 
  result: number;
  date?: string;
}