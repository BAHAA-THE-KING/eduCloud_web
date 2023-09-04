import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Calender, Home, Login } from './Pages';
import { ADDEMPLOYEE, ADDSTUDENT, ADDSUPERVISOR, ADDTEACHER, ADDTEST, ADDTESTFORM, HOME, LOGIN, VIEWEMPLOYEES, VIEWEMPLOYEEDATA, VIEWSTUDENTS, VIEWTESTDATA, VIEWTESTFORMDATA, VIEWTESTFORMS, VIEWTESTS, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA, ADDSUBJECT, VIEWSUBJECTS, VIEWSUBJECTDATA, ADDABILITYTESTFORM, CALENDAR, ACCEPTSTUDENTS, VIEWMARKS, SELECTSTUDENTS, DISTRIBUTESTUDENTS, VIEWSTUDENTDATA, VIEWABILITYTESTFORMS, VIEWABILITYTESTFORMDATA, ANALYZETESTS, addStudent } from "./handlers"
import { SideNavbar } from './components';
import ShowGrades from './Pages/ShowGrades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route
          path="*"
          element={
            <div style={{ display: "flex", flexFlow: "nowrap row" }} className='App'>
              <SideNavbar />
              <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={CALENDAR} element={<Calender />} />
                <Route path={ADDSTUDENT} element={< ShowGrades />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;