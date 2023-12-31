import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import PostTiles from "./components/Posts/PostTiles"
import CreatePost from "./components/Posts/CreatePost";
import PostDetails from "./components/Posts/PostDetails";
import UpdatePost from "./components/Posts/UpdatePost";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/:postId/edit'>
            <UpdatePost />
          </Route>
          <Route path='/new'>
            <CreatePost />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/:postId'>
            <PostDetails />
          </Route>
          <Route exact path='/'>
            <PostTiles />
          </Route>
          {/* <Route path='*'>
            <h1>404 not Found</h1>
            <p>The page you are looking for does not exist.</p>
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;
