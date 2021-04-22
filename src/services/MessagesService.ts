import { getCustomRepository, Repository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";
import { Message } from "../entities/Message";

interface IMessageServices {
  admin_id : string;
  user_id : string;
  text : string;
}

class MessagesService {

  private messagesRepository : Repository<Message>;

  async Create({ admin_id, user_id, text } : IMessageServices) {
    const message = this.messagesRepository.create({ admin_id, user_id, text}); 

    await this.messagesRepository.save(message);
    
    return message;
  }

  constructor(){
    if (!this.messagesRepository){
      this.messagesRepository = getCustomRepository(MessagesRepository);
    }
  }
}

export { MessagesService }