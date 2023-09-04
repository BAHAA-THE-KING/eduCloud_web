import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { SchoolCalender, Home, Login, SubjectsCalender } from './Pages';
import { ADDEMPLOYEE, ADDSTUDENT, ADDSUPERVISOR, ADDTEACHER, ADDTEST, ADDTESTFORM, HOME, LOGIN, VIEWEMPLOYEES, VIEWEMPLOYEEDATA, VIEWSTUDENTS, VIEWTESTDATA, VIEWTESTFORMDATA, VIEWTESTFORMS, VIEWTESTS, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA, ADDSUBJECT, VIEWSUBJECTS, VIEWSUBJECTDATA, ADDABILITYTESTFORM, ACCEPTSTUDENTS, VIEWMARKS, SELECTSTUDENTS, DISTRIBUTESTUDENTS, VIEWSTUDENTDATA, VIEWABILITYTESTFORMS, VIEWABILITYTESTFORMDATA, ANALYZETESTS, CALENDAR } from "./handlers"
import { CalendarHeader, SideNavbar } from './components';
import { useEffect } from 'react';

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
                <Route path={CALENDAR.main + "/*"} element={
                  <div
                    className='w-100'
                    style={{ display: "flex", flexFlow: "nowrap column" }}
                  >
                    <CalendarHeader />
                    <Routes>
                      <Route path={CALENDAR.school} element={<SchoolCalender />} />
                      <Route path={CALENDAR.subjects} element={<SubjectsCalender />} />
                    </Routes>
                  </div>
                } />
              </Routes>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;