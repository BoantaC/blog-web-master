import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from 'react-router-dom';
import LogInPage from './pages/log-in';
import AdminPage from './pages/admin';

import {
  faEnvelopeOpenText,
  faUserFriends,
  faAppleAlt,
  faComments,
  faEyeSlash,
  faTrashAlt,
  faBookOpen,
  faIdBadge,
  faInbox,
  faCogs,
  faEdit,
  faKey,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import fontawesome from '@fortawesome/fontawesome';
import BlogPage from './pages/blog-page';
import CreateEditBlog from './pages/create-edit-blog';

fontawesome.library.add(
  faEnvelopeOpenText,
  faUserFriends,
  faAppleAlt,
  faComments,
  faEyeSlash,
  faTrashAlt,
  faBookOpen,
  faIdBadge,
  faInbox,
  faCogs,
  faEdit,
  faKey,
  faEye
);

export const App = () => {
  const history = useHistory();
  return (
    <>
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
    </>
  );
};

export default App;
