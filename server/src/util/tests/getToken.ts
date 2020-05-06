import factory from './factories';
import User from '../../app/models/User';

async function getToken(): Promise<string> {
  const user = await factory.create<User>('User');

  return `Bearer ${user.generateToken()}`;
}

export default getToken;
