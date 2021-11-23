import { BlogDatastore } from './blog.datastore';
import * as core from 'express-serve-static-core';
import { IBlog } from './blog.model';
import { Request, Response } from 'express';
import { respondWithSuccess, respondWithError } from '../shared/utils/response';

export class BlogRouter {
  private blogDataStore: BlogDatastore;

  constructor(app: core.Express) {
    this.blogDataStore = new BlogDatastore();

    this.initRoutes(app);
  }

  private initRoutes(app: core.Express) {
    // blog initRoutes

    app.get('/api/blog/:id', this.getBlogById.bind(this));
    app.get('/api/blog/get-all', this.getAllUsers.bind(this));
    app.post('/api/blog/', this.create.bind(this));
    app.put('/api/blog/:id', this.update.bind(this));
    app.delete('/api/blog/:id', this.delete.bind(this));
  }

  // get Blog id
  private getBlogById(request: Request, response: Response) {
    const blogId: string = request.params.id;

    this.blogDataStore
      .getUserById(blogId)
      .then((result) => {
        if (!result) {
          return respondWithError(response, 'Blog not found', 404);
        } else {
          response.send(result);
        }
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error);
      });
  }

  // Get All blogs
  private getAllUsers(request: Request, response: Response) {
    this.blogDataStore
      .findAll()
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error);
      });
  }

  // create blog
  private create(request: Request, response: Response) {
    const blog: IBlog = request.body;

    if (!request.body.title || !request.body.description) {
      return response.status(400).send({
        message: 'User data can not be empty',
      });
    }

    this.blogDataStore
      .create(blog)
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error, 500);
      });
  }

  // update blog
  private update(request: Request, response: Response) {
    const blog: IBlog = request.body;
    const blogId: string = request.params.id;

    if (!request.body.title && !request.body.description) {
      return response
        .status(400)
        .send({ message: 'Blog update cannot be empty' });
    }

    this.blogDataStore
      .update(blogId, blog)
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error, 500);
      });
  }

  // delete blog
  private delete(request: Request, response: Response) {
    const blog: IBlog = request.body;
    const blogId: string = request.params.id;

    if (!blogId) {
      return response.status(400).send({
        message: 'Cannot delete the user because u introduce the wrong id :)',
      });
    }

    this.blogDataStore
      .delete(blogId, blog)
      .then((result) => {
        respondWithSuccess(response, result);
      })
      .catch((error) => {
        respondWithError(response, error, 500);
      });
  }
}
