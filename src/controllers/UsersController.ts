import { Request, Response } from 'express';
import { UsersServices } from '../services/UsersSevices';

class UsersController {

  private usersServices : UsersServices;

  async CreateUser (req : Request,res : Response){   
    
    const { email }  = req.body;

    const user = await this.usersServices.Create({ email });
    res.json(user);
  }

  constructor() {
    if (!this.usersServices){
      this.usersServices = new UsersServices();
    }
  }
}

export { UsersController }