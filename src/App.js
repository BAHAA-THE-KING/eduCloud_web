import './App.css';
//include bootsrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { HOME, LOGIN, VIEWGRADES, CALENDAR, SCHOOL } from "./handlers"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CalendarHeader, SideNavbar } from './components';
import { SchoolCalendar, Home, Login, SubjectsCalendar, ClassCalendar, ShowGrades } from './Pages';
import { Container, Row } from 'react-bootstrap';
import { GradesStudentClassesHeader } from './components/GradesStudentClassesHeader';
import { AddNewStudent } from './Pages/AddNewStudent';
import { GradeClasses } from './Pages//GradeClasses/GradeClasses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN} element={<Login />} />
        <Route
          path="*"
          element={
            <div
              style={{
                display: "flex",
                flexFlow: "nowrap row",
                justifyContent: "space-between",
                backgroundImage: "url('Images/background2.png')",
                backgroundSize: "cover",
                paddingLeft: "10rem"
              }}
              className='App'
            >
              <SideNavbar />
              <Routes>
                <Route path={HOME} element={<Home />} />
                <Route path={CALENDAR.main + "/*"} element={
                  <Container fluid style={{ overflowY: "auto" }}>
                    <CalendarHeader />
                    <Routes>
                      <Route path={CALENDAR.school} element={<SchoolCalendar />} />
                      <Route path={CALENDAR.subjects} element={<SubjectsCalendar />} />
                      <Route path={CALENDAR.class} element={<ClassCalendar />} />
                    </Routes>
                  </Container>
                } />
                <Route path={SCHOOL.main + "/*"} element={
                  <Container fluid style={{ overflowY: "auto" }}>
                    <GradesStudentClassesHeader />
                    <Routes>
                      <Route path={SCHOOL.classes} element={<ShowGrades />} />
                      <Route path={SCHOOL.student} element={<AddNewStudent />} />
                      <Route path={SCHOOL.school} element={<GradeClasses />} />
                    </Routes>
                  </Container>
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