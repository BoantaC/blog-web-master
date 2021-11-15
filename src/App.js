import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LogInPage from './pages/log-in';
import AdminPage from './pages/admin';

import {
  faEnvelopeOpenText,
  faKey,
  faEyeSlash,
  faEye,
  faAppleAlt,
  faComments,
  faUserFriends,
  faCogs,
  faInbox,
} from '@fortawesome/free-solid-svg-icons';
import fontawesome from '@fortawesome/fontawesome';
import BlogPage from './pages/blog-page';

fontawesome.library.add(
  faEnvelopeOpenText,
  faKey,
  faEyeSlash,
  faEye,
  faAppleAlt,
  faComments,
  faUserFriends,
  faCogs,
  faInbox,
);

export const App = () => {
  return (
    <>
      <div className="app" />
      {/*eslint-disable-next-line no-restricted-globals*/}
      <Router history={history}>
        <Switch>
          <Route exact path="/blog">
            <BlogPage />
          </Route>
          <Route exact path="/admin">
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
