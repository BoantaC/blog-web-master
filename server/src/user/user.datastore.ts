import { IUser, User } from './user.model';

export class UserDatastore {
  create(user: IUser) {
    return User.create(user);
  }

  update(userId: string, user: IUser) {
    return User.findByIdAndUpdate(userId, user, { new: true });
  }

  delete(userId: string) {
    return User.findByIdAndRemove(userId);
  }

  getUserById(userId: string) {
    return User.findById(userId);
  }

  findAll() {
    return User.find();
  }

  getUserByUsernameAndPassword(username: string, password: string) {
    return User.findOne({ username, password });
  }
}
