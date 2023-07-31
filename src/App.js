import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Header, Home, AddEmployee, AddTeacherData, AddSupervisorData, ViewEmployees, ViewEmployeeData, AddTestForm, ViewTestForms, ViewTestFormData, ViewStudents } from './Pages';
import { ADDEMPLOYEE, ADDSTUDENT, ADDSUPERVISOR, ADDTEACHER, ADDTESTFORM, HOME, LOGIN, VIEWEMPLOYEE, VIEWEMPLOYEEDATA, VIEWSTUDENTS, VIEWTESTFORMDATA, VIEWTESTFORMS } from "./handlers"

const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />
  },
  {
    path: HOME,
    element: <><Header /><Home /></>,
  },
  {
    path: VIEWEMPLOYEE,
    element: <><Header active="employees" /><ViewEmployees /></>
  },
  {
    path: VIEWEMPLOYEEDATA + ":id",
    element: <><Header active="employees" /><ViewEmployeeData /></>
  },
  {
    path: ADDEMPLOYEE,
    element: <><Header active="employees" /><AddEmployee /></>
  },
  {
    path: ADDTEACHER,
    element: <><Header active="employees" /><AddTeacherData /></>
  },
  {
    path: ADDSUPERVISOR,
    element: <><Header active="employees" /><AddSupervisorData /></>
  },
  {
    path: ADDTESTFORM,
    element: <><Header active="tests" /><AddTestForm /></>
  },
  {
    path: VIEWTESTFORMS,
    element: <><Header active="tests" /><ViewTestForms /></>
  },
  {
    path: VIEWTESTFORMDATA + ":id",
    element: <><Header active="tests" /><ViewTestFormData /></>
  },
  {
    path: VIEWSTUDENTS,
    element: <><Header active="students" /><ViewStudents /></>
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