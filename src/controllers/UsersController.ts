import { Request, Response } from 'express';
import { UsersServices } from '../services/UsersSevices';

class UsersController {

  private usersServices : UsersServices;

  async CreateUser (req : Request,res : Response) : Promise<Response>{   
    const { email } = req.body;

    const usersServices = new UsersServices();

    const user = await usersServices.Create({ email });

    return res.json(user);
  }

  async ListUsers (req : Request, res : Response) : Promise<Response>{
    const usersServices = new UsersServices();

    const users = await usersServices.List();

    return res.json(users);
  }
  
}

export { UsersController }