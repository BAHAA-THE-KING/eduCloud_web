import './App.css';
//include bootsrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { ADDEMPLOYEE, ADDSTUDENT, ADDSUPERVISOR, ADDTEACHER, ADDTEST, ADDTESTFORM, HOME, LOGIN, VIEWEMPLOYEES, VIEWEMPLOYEEDATA, VIEWSTUDENTS, VIEWTESTDATA, VIEWTESTFORMDATA, VIEWTESTFORMS, VIEWTESTS, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA, ADDSUBJECT, VIEWSUBJECTS, VIEWSUBJECTDATA, ADDABILITYTESTFORM, CALENDAR, ACCEPTSTUDENTS, VIEWMARKS, SELECTSTUDENTS, DISTRIBUTESTUDENTS, VIEWSTUDENTDATA, VIEWABILITYTESTFORMS, VIEWABILITYTESTFORMDATA, ANALYZETESTS, addStudent } from "./handlers"
import { BrowserRouter, Route, Routes, redirect } from 'react-router-dom';
import { CalendarHeader, SideNavbar } from './components';
import { SchoolCalendar, Home, Login, SubjectsCalendar } from './Pages';
import ShowGrades from './Pages/ShowGrades';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route
          path="*"
          element={
            <div style={{ display: "flex", flexFlow: "nowrap row", justifyContent: "space-between" }} className='App'>
              <SideNavbar />
              <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={CALENDAR.main + "/*"} element={
                  <div
                    className='w-100 grade'
                    style={{ display: "flex", flexFlow: "nowrap column" }}
                  >
                    <CalendarHeader />
                    <Routes>
                      <Route
                        path={CALENDAR.school}
                        element={<SchoolCalendar />}
                      />
                      <Route path={CALENDAR.subjects} element={<SubjectsCalendar />} />
                    </Routes>
                  </div>
                } />
                <Route path={ADDSTUDENT} element={<ShowGrades />} />
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;