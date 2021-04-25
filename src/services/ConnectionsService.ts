import { getCustomRepository } from 'typeorm';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';
import { Connection } from '../entities/Connection';

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: ConnectionsRepository;

  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id, 
    });

    await this.connectionsRepository.save(connection);
  }

  async findByUserId(user_id: string) {
    const connection = this.connectionsRepository.findOne({ user_id });

    return connection;
  }

  async findPendingConnections() {
    const connection = this.connectionsRepository.find({
      where: { admin_id: null },
      relations:['user']
    });

    return connection;
  }

  async findBySocketId(socket_id : string) {
    const connection = await this.connectionsRepository.findOne({ socket_id });
    return connection;
  }

  async updateAdminID(user_id: string, admin_id: string) {
    await this.connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({ admin_id })
      .where('user_id = :user_id', {
        user_id,
      })
      .execute();
  }

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }
}

export { ConnectionsService };
