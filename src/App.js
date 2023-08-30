import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login } from './Pages';
import { ADDEMPLOYEE, ADDSTUDENT, ADDSUPERVISOR, ADDTEACHER, ADDTEST, ADDTESTFORM, HOME, LOGIN, VIEWEMPLOYEES, VIEWEMPLOYEEDATA, VIEWSTUDENTS, VIEWTESTDATA, VIEWTESTFORMDATA, VIEWTESTFORMS, VIEWTESTS, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA, ADDSUBJECT, VIEWSUBJECTS, VIEWSUBJECTDATA, ADDABILITYTESTFORM, CALENDAR, ACCEPTSTUDENTS, VIEWMARKS, SELECTSTUDENTS, DISTRIBUTESTUDENTS, VIEWSTUDENTDATA, VIEWABILITYTESTFORMS, VIEWABILITYTESTFORMDATA, ANALYZETESTS } from "./handlers"
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;