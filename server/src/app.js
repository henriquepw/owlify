import 'dotenv/config';

import cors from 'cors';
import Youch from 'youch';
import express from 'express';
import 'express-async-errors';

import routes from './routes';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const erros =
        process.env.NODE_ENV === 'development'
          ? await new Youch(err, req).toJSON()
          : { error: 'Internal server error' };

      return res.status(500).json(erros);
    });
  }
}

export default new App().server;
