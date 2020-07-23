import User from '../../app/models/User';
import factory from './factories';

async function getToken(): Promise<string> {
  const user = await factory.create<User>('User');

  return `Bearer ${user.generateToken()}`;
}

export default getToken;
