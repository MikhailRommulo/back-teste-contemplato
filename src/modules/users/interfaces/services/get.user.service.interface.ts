import { User } from '../../domain/user.entity';

export interface GetUserService {
  getById(id: string): Promise<User | undefined>;
}
