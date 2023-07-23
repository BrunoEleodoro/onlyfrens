import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateGroup from './pages/Create/Create';
import Test from './pages/Test/Test';
import ViewMyGroups from './pages/ViewMyGroups/ViewMyGroups';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/create',
      element: <CreateGroup />,
    },
    {
      path: '/view',
      element: <ViewMyGroups />,
    },
    {
      path: '/test',
      element: <Test />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
