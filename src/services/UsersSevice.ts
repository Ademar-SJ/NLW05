import { getCustomRepository, Repository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from '../entities/User';


interface IUsersServices{
  email : string;
}

class UsersService {

  private usersRepository : Repository<User>;

  async Create({ email } : IUsersServices){

    const user = await this.usersRepository.findOne({ email });
    if (user){
      return user;
    }

    const newUser = this.usersRepository.create({
      email 
    });
  
    await this.usersRepository.save(newUser);

    return newUser;
  }

  async List() {
    const users = await this.usersRepository.find({});

    return users;
  }

  async FindByEmail({ email }){
    const user = await this.usersRepository.findOne({ email });

    return user;
  }

  constructor(){
    if (!this.usersRepository) {
      this.usersRepository = getCustomRepository(UsersRepository);
    }
  }

}

export { UsersService };