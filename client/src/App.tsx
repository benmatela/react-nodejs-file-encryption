import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import { PageNotFound } from './pages/PageNotFound';
import { Home } from './pages/home/Home';
import { Encryption } from './pages/encryption/Encryption';

function App() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <PageNotFound />,
    },
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/encryption",
      element: <Encryption />,
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
