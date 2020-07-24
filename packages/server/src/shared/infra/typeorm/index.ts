import { createConnection } from 'typeorm';

import ormConfig from '@config/typeorm';

createConnection(ormConfig);
