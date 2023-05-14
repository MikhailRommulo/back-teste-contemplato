import { User } from '../../domain/user.entity';

export interface GetUserApplication {
  getById(id: string): Promise<User | undefined>;
}
