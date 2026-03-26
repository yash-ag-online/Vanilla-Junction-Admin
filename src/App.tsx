import { createBrowserRouter, RouterProvider } from 'react-router';
import Wrapper from './components/wrapper';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Wrapper />,
    children: [],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
