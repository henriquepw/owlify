import 'dotenv/config';

import express, {
  Errback,
  Request,
  Response,
  NextFunction,
} from 'express';
import 'express-async-errors';

import cors from 'cors';
import Youch from 'youch';

import routes from './routes';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(routes);
  }

  private exceptionHandler() {
    this.server.use(async (err: Errback, req: Request, res: Response, next: NextFunction) => {
      const erros = process.env.NODE_ENV === 'development'
        ? await new Youch(err, req).toJSON()
        : { error: 'Internal server error' };

      return res.status(500).json(erros);
    });
  }
}

export default new App().server;
