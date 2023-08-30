
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage/HomePage';
import { Toaster } from 'react-hot-toast';



function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage></HomePage>
    },

    {
      path: '/home/:id',
      loader: ({ params }) => fetch(`https://test-project-emhossain.vercel.app/user/${params.id}`),
      element: <HomePage></HomePage>
    }
  ])

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </>


  );
}

export default App;
