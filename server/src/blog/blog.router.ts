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
    app.get('/api/blog/get-all', this.getAllBlogs.bind(this));
    app.get('/api/blog/:id', this.getBlogById.bind(this));

    app.delete('/api/blog/:id', this.delete.bind(this));

    app.put('/api/blog/:id', this.update.bind(this));

    app.post('/api/blog', this.create.bind(this));
  }

  private getBlogById(request: Request, response: Response) {
    const blogId: string = request.params.id;

    this.blogDataStore
      .getOneById(blogId)
      .then((result) => {
        if (!result) {
          return respondWithError(response, 'Blog not found', 404);
        } else {
          return respondWithSuccess(response, result);
        }
      })
      .catch((error) => {
        respondWithError(response, error);
      });
  }

  private getAllBlogs(request: Request, response: Response) {
    this.blogDataStore
      .findAll()
      .then((blogs) => {
        return respondWithSuccess(response, blogs || []);
      })
      .catch(() => {
        return respondWithError(
          response,
          'An error occured while retrieving users'
        );
      });
  }

  private create(request: Request, response: Response) {
    const blog: IBlog = request.body;
    const title: string = request.body.title;
    const description: string = request.body.description;

    if (!title || !description) {
      // If the description and title does not exists, return an error response
      return respondWithError(
        response,
        'Blog title or description cannot be empty',
        400
      );
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
