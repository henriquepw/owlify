import 'reflect-metadata';
import '@config/bootstrap';

import express, { Errback, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import http from 'http';
import Youch from 'youch';

import routes from './routes';

import '@shared/container';
import '../typeorm';

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

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(routes);
  }

  private exceptionHandler(): void {
    this.app.use(
      async (err: Errback, req: Request, res: Response, _: NextFunction) => {
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
