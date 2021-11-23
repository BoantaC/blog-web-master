import { UserDatastore } from './user.datastore';
import * as core from 'express-serve-static-core';
import { Request, Response } from 'express';
import { IUser } from './user.model';
import { respondWithError, respondWithSuccess } from '../shared/utils/response';

export class UserRouter {
  private userDatastore: UserDatastore;

  constructor(app: core.Express) {
    this.userDatastore = new UserDatastore();

    this.initRoutes(app);
  }

  private initRoutes(app: core.Express) {
    // user initRoutes
    app.get('/api/user/:id', this.getUserById.bind(this));
    app.get('/api/user/get-all', this.getAllUsers.bind(this));
    app.post('/api/user', this.create.bind(this));
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
      .catch((error) => {
        respondWithError(response, error);
      });
  }

  // Create User
  private create(request: Request, response: Response) {
    const user: IUser = request.body;
    if (
      !request.body.firstName ||
      !request.body.lastName ||
      !request.body.email
    ) {
      return response.status(400).send({
        message: 'User data can not be empty',
      });
    }

    this.userDatastore
      .create(user)
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error, 500);
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
      return response
        .status(400)
        .send({ message: 'User update cannot be empty' });
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
        message: 'Cannot delete the user because u introduce the wrong id :)',
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
}
