import 'dotenv/config';
import http from 'http';

import app from './app';

const { log } = console;

http
  .createServer(app)
  .listen(process.env.PORT, () => log(`Listening on port ${process.env.PORT}`));

// app.listen(3333);
