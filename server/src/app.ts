import './bootstrap';

import express, { Errback, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import Youch from 'youch';
import http from 'http';

import routes from './routes';

import './database';

class App {
  private app: express.Application;

  public server: http.Server;

  constructor() {
    this.app = express();
    this.server = new http.Server(this.app);

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }

  private exceptionHandler() {
    this.app.use(
      async (err: Errback, req: Request, res: Response, next: NextFunction) => {
        const { NODE_ENV } = process.env;

        const error =
          NODE_ENV !== 'production'
            ? await new Youch(err, req).toJSON()
            : { error: 'Internal server error' };

        return res.status(500).send(error);
      },
    );
  }
}

export default new App().server;
