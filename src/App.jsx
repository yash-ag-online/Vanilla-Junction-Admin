import { createBrowserRouter, RouterProvider } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <></>,
    children: [],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router}>
        <></>
      </RouterProvider>
    </>
  );
}

export default App;
