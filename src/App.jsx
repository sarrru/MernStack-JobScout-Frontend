import { useState } from 'react';
import { createBrowserRouter, Router, RouterProvider } from 'react-router-dom';
import { Home } from './components/ui/Home';
import { Login } from './components/ui/auth/Login';
import { Signup } from './components/ui/auth/signup';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },

]
)

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <RouterProvider router={appRouter} />
      </div>


    </>
  );
}

export default App;
