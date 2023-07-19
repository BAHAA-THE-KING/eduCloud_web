import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Header, Home, AddEmployee, AddTeacherData } from './Pages';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/",
    element: <><Header /><Home /></>,
  },
  {
    path: "/employee/add",
    element: <><Header active="employees" /><AddEmployee /></>
  },
  {
    path: "/teacher/add",
    element: <><Header active="employees" /><AddTeacherData /></>
  }
]);

function App() {
  return (
    <div className="App" dir='rtl'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;