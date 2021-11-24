import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
// import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import HomePage from './components/HomePage/HomePage';
import Explore from './components/Explore/Explore';
import Post from './components/Post/Post';

function App() {
  const sessionUser = useSelector(state => state.session.user)
  const allPosts = useSelector(state => state.posts.allPosts) || {}
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact={true} >
          <HomePage/>
        </Route>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:username' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/explore' exact={true} >
          <Explore/>
        </ProtectedRoute>
        <ProtectedRoute path='/posts/:postId' exact={true} >
          <Post/>
        </ProtectedRoute>


      </Switch>
    </BrowserRouter>
  );
}

export default App;
