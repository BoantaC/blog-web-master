import { UserDatastore } from './user.datastore';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { IUser } from './user.model';
import { respondWithError, respondWithSuccess } from '../shared/utils/response';
import * as bcrypt from 'bcrypt';

export class UserRouter {
  private userDatastore: UserDatastore;

  constructor(app: core.Express) {
    this.userDatastore = new UserDatastore();

    this.initRoutes(app);
  }

  // user initRoutes
  private initRoutes(app: core.Express) {
    app.get('/api/user/:id', this.getUserById.bind(this));
    app.get('/api/user/get-all', this.getAllUsers.bind(this));

    app.post('/api/user', this.create.bind(this));
    app.post('/api/user/auth/login', this.login.bind(this));

    app.put('/api/user/:id', this.update.bind(this));
    app.delete('/api/user/:id', this.delete.bind(this));
  }

  // Get User by id
  private getUserById(request: Request, response: Response) {
    const userId: string = request.params.id;

    this.userDatastore
      .getUserById(userId)
      .then((result) => {
        if (!result) {
          return respondWithError(response, 'User not found', 404);
        } else {
          response.send(result);
        }
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error);
      });
  }

  // Get All users
  private getAllUsers(request: Request, response: Response) {
    this.userDatastore
      .findAll()
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch(() => {
        respondWithError(response, 'An error occured while retrieving users');
      });
  }

  // Create User
  private create(request: Request, response: Response) {
    const user: IUser = request.body;

    if (!user.firstName || !user.lastName || !user.email || !user.password) {
      return response.status(400).send({
        message: 'User data can not be empty',
      });
    }

    bcrypt.hash(user.password, 10, (error, hash) => {
      if (error) {
        return respondWithError(response, 'Could not create user', 500);
      }

      user.password = hash;

      this.userDatastore
        .create(user)
        .then((result) => {
          // bcrypt function
          respondWithSuccess(response, result);
        })
        .catch((dbError) => {
          respondWithError(response, dbError, 500);
        });
    });
  }

  // Update User
  private update(request: Request, response: Response) {
    const user: IUser = request.body;
    const userId: string = request.params.id;

    if (
      !request.body.firstName &&
      !request.body.lastName &&
      !request.body.email
    ) {
      return respondWithError(response, 'User update cannot be empty', 500);
    }

    this.userDatastore
      .update(userId, user)
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error, 500);
      });
  }

  // Delete User
  private delete(request: Request, response: Response) {
    const userId: string = request.params.id;

    if (!userId) {
      return response.status(400).send({
        message: 'Cannot delete the user because u introduce the wrong id ',
      });
    }

    this.userDatastore
      .delete(userId)
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error, 500);
      });
  }

  // Auth router
  private login(request: Request, response: Response) {
    const username: string = request.body.username;
    const password: string = request.body.password;

    if (!username || !password) {
      return respondWithError(response, 'Invalid credentials', 404);
    }

    this.userDatastore
      .getUserByUsernameAndPassword(username, password)
      .then((result) => {
        if (!result || !result._id) {
          return respondWithError(response, 'Invalid credentials', 404);
        } else {
          return respondWithSuccess(response, result);
        }
      })
      .catch((error) => {
        respondWithError(response, error, 500);
      });
  }
}
