import express from 'express';
import morgan from "morgan";
import { connect } from './database';
import routes from './modules';

class Server {
  public app!: express.Application;
  constructor() {
    this.init();
    this.config();
    this.routes();
    connect();
  }

  private init() {
    this.app = express();
  }

  private config() {
    this.app.use(morgan('dev'));
    this.app.use(express.json());
  }

  private routes() {
    this.app.use('', routes);
  }

}

export default new Server().app;