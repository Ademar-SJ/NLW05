import { Request, Response } from 'express';
import { UsersService } from '../services/UsersSevice';

class UsersController {

  private usersServices : UsersService;

  async CreateUser (req : Request,res : Response) : Promise<Response>{   
    const { email } = req.body;

    const usersServices = new UsersService();

    const user = await usersServices.Create({ email });

    return res.json(user);
  }

  async ListUsers (req : Request, res : Response) : Promise<Response>{
    const usersServices = new UsersService();

    const users = await usersServices.List();

    return res.json(users);
  }

  async FindByEmail (req : Request, res : Response) : Promise<Response> {
    const usersServices = new UsersService();

    const { email } = req.params;
    const user = await usersServices.FindByEmail({ email });

    return res.json(user);
  }
  
}

export { UsersController }