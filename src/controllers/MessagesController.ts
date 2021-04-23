import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';


class MessagesController {
  async CreateMessage(req : Request, res : Response) : Promise<Response> {

    const messagesService = new MessagesService();

    const { admin_id, user_id, text} = req.body;

    const message = await messagesService.Create({ admin_id, user_id, text});

    return res.status(200).json(message);
  }


  async FindByUser(req : Request, res : Response) : Promise<Response> {

    const messagesService = new MessagesService();

    const { user_id } = req.params;

    const messages = await messagesService.listByUser(user_id);

    return res.status(200).json(messages);
  }
}


export { MessagesController }