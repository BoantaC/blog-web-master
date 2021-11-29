import { IBlog, Blog } from './blog.model';

export class BlogDatastore {
  create(blog: IBlog) {
    return Blog.create(blog);
  }

  update(blogId: string, blog: IBlog) {
    return Blog.findByIdAndUpdate(blogId, blog, { new: true });
  }

  delete(blogId: string, blog: IBlog) {
    return Blog.findByIdAndRemove(blogId, blog);
  }

  getOneById(blogId: string) {
    return Blog.findById(blogId);
  }

  findAll() {
    return Blog.find();
  }
}
