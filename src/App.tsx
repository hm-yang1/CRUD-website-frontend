import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreatePost from './pages/Posts/CreatePost'
import { RequireAuth, UseAuth } from './pages/Authentication/AuthContext';
import EditPost from './pages/Posts/EditPost';
import Home from './pages/Home/Home';
import Login from './pages/Authentication/LoginPage';
import Register from './pages/Authentication/Register';
import ViewPost from './pages/Posts/ViewPost';
import FilteredPosts from './pages/Posts/Filtered/FilteredPosts';
import SearchedPosts from './pages/Posts/Searched/SearchedPosts';
import { DefaultTheme } from './styles/theme';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';

// export const DefaultTheme = createTheme();
function App() {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/posts/:postid" element={<ViewPost/>}/>
          <Route path="/filtered-posts" element={<FilteredPosts/>}/>
          <Route path="/searched-posts" element={<SearchedPosts/>}/>
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
    </ThemeProvider>
  );
}

export default App;