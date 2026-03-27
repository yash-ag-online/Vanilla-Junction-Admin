import { createBrowserRouter, RouterProvider } from 'react-router';
import Wrapper from './components/wrapper';
import Auth from './pages/auth';
import { Toaster } from '@/components/ui/sonner';
import { UserContextProvider } from './providers/user-provider';

const router = createBrowserRouter([
  {
    path: '/auth',
    element: <Auth />,
  },
  {
    path: '/',
    element: <Wrapper />,
    children: [],
  },
]);

function App() {
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
        <Toaster />
      </UserContextProvider>
    </>
  );
}

export default App;
