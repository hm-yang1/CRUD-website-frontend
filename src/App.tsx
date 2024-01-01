import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme } from '@mui/material';
import CreatePost from './pages/Posts/CreatePost'
import { RequireAuth, UseAuth } from './pages/Authentication/AuthContext';
import EditPost from './pages/Posts/EditPost';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/LoginPage';
import Register from './pages/Register/Register';
import ViewPost from './pages/Posts/ViewPost';
import FilteredPosts from './pages/Filtered/FilteredPosts';

export const DefaultTheme = createTheme();
function App() {
  const { isAuthenticated } = UseAuth();
  console.log(isAuthenticated);
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        {/* <Route path="/posts" Component={}/> */}
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/posts/:postid" Component={ViewPost}/>
        <Route path="/filtered-posts" Component={FilteredPosts}/>
        {/* Private routes that require authentication */}
        <Route 
          path="/posts/create"
          element ={
            <RequireAuth redirectTo='/login'>
              <CreatePost/>
            </RequireAuth>
          }
        />
        <Route 
          path="/posts/edit/:postid"
          element ={
            <RequireAuth redirectTo='/login'>
              <EditPost/>
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;