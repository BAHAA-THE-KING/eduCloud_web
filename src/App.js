import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Header, Home, AddEmployee, AddTeacherData, AddSupervisorData, ViewEmployees } from './Pages';

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
    path: "/employee",
    element: <><Header active="employees" /><ViewEmployees /></>
  },
  {
    path: "/employee/add",
    element: <><Header active="employees" /><AddEmployee /></>
  },
  {
    path: "/teacher/add",
    element: <><Header active="employees" /><AddTeacherData /></>
  },
  {
    path: "/supervisor/add",
    element: <><Header active="employees" /><AddSupervisorData /></>
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