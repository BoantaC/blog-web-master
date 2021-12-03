import { createContext, useEffect, useState } from 'react';
import {
  Router,
  Route,
  Switch,
  useHistory,
  useRouteMatch,
} from 'react-router-dom';
import {
  faEnvelopeOpenText,
  faUserFriends,
  faAppleAlt,
  faComments,
  faEyeSlash,
  faTrashAlt,
  faBookOpen,
  faIdBadge,
  faUserAlt,
  faInbox,
  faCogs,
  faEdit,
  faKey,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import fontawesome from '@fortawesome/fontawesome';
import CreateEditBlog from './pages/create-edit-blog';
import LogInPage from './pages/log-in';
import AdminPage from './pages/admin';
import BlogPage from './pages/blog-page';
import { userService } from './services/user-service';

fontawesome.library.add(
  faEnvelopeOpenText,
  faUserFriends,
  faAppleAlt,
  faComments,
  faEyeSlash,
  faTrashAlt,
  faBookOpen,
  faUserAlt,
  faIdBadge,
  faInbox,
  faCogs,
  faEdit,
  faKey,
  faEye
);

export const UserContext = createContext({});

export const App = () => {
  const [user, setUser] = useState({});
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    const userId = getItemFromLocalStorageById('userId');
    if (userId) {
      userService
        .getOneById(userId)
        .then((result) => {
          const userFromResponse = result.data;

          if (userFromResponse?._id) {
            setUser(userFromResponse);
            if (match.path === `/login`) {
              console.log();
              history.push(`/admin`);
            }
          }
        })
        .catch(() => {
          localStorage.removeItem('userId');
          history.push(`/login`);
        });
    } else {
      history.push(`/login`);
    }
  }, []);

  const getItemFromLocalStorageById = (key) => {
    return localStorage.getItem(key);
  };

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Router history={history}>
          <Switch>
            <Route exact path="/blog">
              <BlogPage />
            </Route>
            <Route exact path="/admin/blog/create">
              <CreateEditBlog />
            </Route>
            <Route exact path="/admin/blog/edit/:id">
              <CreateEditBlog />
            </Route>
            <Route path="/admin">
              <AdminPage />
            </Route>
            <Route exact path="/login">
              <LogInPage />
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </>
  );
};

export default App;
