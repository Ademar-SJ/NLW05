import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from '../entities/User';


interface IUsersServices{
  email : string;
}

class UsersServices {

  private usersRepository : Repository<User>;

  async Create({ email } : IUsersServices){

    const user = this.usersRepository.findOne({ email });

    if (user){
      return user;
    }

    const newUser = this.usersRepository.create({
      email 
    });
  
    await this.usersRepository.save(newUser);

    return newUser;
  }


  constructor(){
    if (!this.usersRepository) {
      this.usersRepository = getCustomRepository(UsersRepository);
    }
  }

}

export { UsersServices };