import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import { AuthorPosts, Authors, CategoryPosts, CreatePost, Dashboard, DeletePost, EditPost, ErrorPage ,Home,Login,Logout,PostDetail,Register, UserProfile } from './Exprt';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home />},
      { path: "/posts/:id" , element: <PostDetail /> },
      { path: "/register", element: <Register />},
      { path: "/login", element: <Login />},
      { path: "/profile/:id", element: <UserProfile />},
      { path: "/authors", element: <Authors />},
      { path: "/create", element: <CreatePost />},
      { path: "/posts/categories/:category", element: <CategoryPosts />},
      { path: "/posts/users/:id", element: <AuthorPosts />},
      { path: "/myposts/:id", element: <Dashboard />},
      { path: "/posts/:id/edit", element: <EditPost />},
      { path: "/posts/:id/delete", element: <DeletePost />},
      { path: "/logout", element: <Logout />}
    ]
  }
])



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

