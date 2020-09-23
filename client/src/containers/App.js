import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import { ModalProvider } from '../contexts/modal/modal.context';

import Navigation from '../components/navigation/navigation.component';
import HomePage from '../pages/homepage/homepage.component';
import ProfilePage from '../pages/profile-page/profile-page.component';
import SignInPage from '../pages/sign-in-page/sign-in-page.component';
import SignUpPage from '../pages/sign-up-page/sign-up-page.component';
import CreatePostPage from '../pages/create-post-page/create-post-page.component';
import UserProfilePage from '../pages/user-profile-page/user-profile-page.component';
import PostPage from '../pages/post-page/post-page.component';
import EmptyPostPage from '../pages/empty-post-page/empty-post-page.component';
import EditPage from '../pages/edit-page/edit-page.component';
import ResetPasswordPage from '../pages/reset-password-page/reset-password-page.component';
import NewPasswordPage from '../pages/new-password-page/new-password-page.component';

import { setCurrentUser } from '../reducers/user/user.reducer';
import UserContext from '../contexts/user/user.context';
import './App.css';

const App = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext); // get the value passed by the nearest Context.Provider
  const { user } = state; // to get current state in reducer

  useEffect(() => {
    // check if user has signed in
    const currentUser = JSON.parse(sessionStorage.getItem('user')); // can only store string
    if (currentUser) {
      dispatch(setCurrentUser(currentUser)); // wrapped in dispatch
    } else {
      if(!history.location.pathname.startsWith('/reset-password')){
        history.push('/signin');
      }
    }
  }, [dispatch, history]); // componentDidMount

  return (
    <ModalProvider>
      <Router>
        <Navigation />
        <Switch>
          <Route exact={true} path='/'>
            {user ? <HomePage /> : <Redirect to='/signin' />}
          </Route>
          <Route exact path='/signin'>
            {user ? <Redirect to='/' /> : <SignInPage />} {/* history.goBack() */}
          </Route>
          <Route exact path='/signup'>
            {user ? <Redirect to='/' /> : <SignUpPage />}
          </Route>
          <Route exact path='/createpost'>
            {user ? <CreatePostPage /> : <Redirect to='/signin' />}
          </Route>
          <Route exact path='/profile'>
            {user ? <ProfilePage /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/profile/:userId'>
            {user ? <UserProfilePage /> : <Redirect to='/signin' />}
          </Route>
          <Route path='/post/:postId'>
            {user ? <PostPage /> : <Redirect to='/signin' />}
          </Route>
          <Route exact path='/empty'>
            <EmptyPostPage />
          </Route>
          <Route exact path='/edit'>
            {user ? <EditPage /> : <Redirect to='/signin' />}
          </Route>
          <Route exact path='/reset-password'>
            <ResetPasswordPage />
          </Route>
          <Route path='/reset-password/:token'>
            <NewPasswordPage />
          </Route>
        </Switch>
      </Router>
    </ModalProvider>
  );
};

export default App;
