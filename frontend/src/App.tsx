import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateGroup from './pages/Create/Create';
import Home from './pages/Home/Home';
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
  ]);
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
