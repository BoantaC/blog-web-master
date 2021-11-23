import express from 'express';
import mongoose from 'mongoose';
import { UserRouter } from './user/user.router';
import { BlogRouter } from './blog/blog.router';
import bodyParser from 'body-parser';
import cors from 'cors';

const DEFAULT_PORT = 8081;
const DATABASE_URL = 'mongodb://localhost:27017/blog';

export class App {
  public app = express();

  constructor() {
    this.app.use(bodyParser.json());
    this.app.use(cors());

    this.initDatabase();
  }

  initDatabase(): void {
    console.log('Setting up the database connection...');

    mongoose
      .connect(DATABASE_URL)
      .then(() => {
        console.log('Database successfully connected...');

        /* Once the database connection is alive - we can start receiving request so we start listening */
        this.initServer();
      })
      .catch((error) => {
        console.log('Database connection error...', error);

        setTimeout(() => {
          console.log('[Retry] Setting up the database connection...');

          this.initDatabase();
        }, 3000);
      });
  }

  initServer(): void {
    console.log('Setting up the server...');

    this.initRouters();

    this.app.listen(DEFAULT_PORT, () => {
      console.log(`Server running on http://localhost:${DEFAULT_PORT}`);
    });
  }

  initRouters() {
    const userRouter = new UserRouter(this.app);
    const blogRouter = new BlogRouter(this.app);
  }
}

export default new App().app;
