import './App.css';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Login, Header, Home, AddEmployee, AddTeacherData, AddSupervisorData, ViewEmployees, ViewEmployeeData, AddTestForm, ViewTestForms, ViewTestFormData, ViewStudents, AddTest, ViewTests, ViewTestData, AddStudent, AddGrade, ViewGradeData, AddClass, ViewGrades, ViewClasses, ViewClassData, AddSubject, ViewSubjects, ViewSubjectData, AddAbilityTestForm, Calendar, AcceptStudents, ViewMarks, SelectStudents, DistributeStudents, ViewStudentData, ViewAbilityTestForms, ViewAbilityTestFormData } from './Pages';
import { ADDEMPLOYEE, ADDSTUDENT, ADDSUPERVISOR, ADDTEACHER, ADDTEST, ADDTESTFORM, HOME, LOGIN, VIEWEMPLOYEES, VIEWEMPLOYEEDATA, VIEWSTUDENTS, VIEWTESTDATA, VIEWTESTFORMDATA, VIEWTESTFORMS, VIEWTESTS, ADDGRADE, VIEWGRADES, VIEWGRADEDATA, ADDCLASS, VIEWCLASSES, VIEWCLASSDATA, ADDSUBJECT, VIEWSUBJECTS, VIEWSUBJECTDATA, ADDABILITYTESTFORM, CALENDAR, ACCEPTSTUDENTS, VIEWMARKS, SELECTSTUDENTS, DISTRIBUTESTUDENTS, VIEWSTUDENTDATA, VIEWABILITYTESTFORMS, VIEWABILITYTESTFORMDATA } from "./handlers"

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
    path: VIEWEMPLOYEES,
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
    path: ADDSTUDENT,
    element: <><Header active="students" /><AddStudent /></>
  },
  {
    path: VIEWSTUDENTS,
    element: <><Header active="students" /><ViewStudents /></>
  },
  {
    path: ADDTEST,
    element: <><Header active="tests" /><AddTest /></>
  },
  {
    path: VIEWTESTS,
    element: <><Header active="tests" /><ViewTests /></>
  },
  {
    path: VIEWTESTDATA + ":id",
    element: <><Header active="tests" /><ViewTestData /></>
  },
  {
    path: ADDGRADE,
    element: <><Header active="managements" /><AddGrade /></>
  },
  {
    path: VIEWGRADES,
    element: <><Header active="managements" /><ViewGrades /></>
  },
  {
    path: VIEWGRADEDATA + ":id",
    element: <><Header active="managements" /><ViewGradeData /></>
  },
  {
    path: ADDCLASS,
    element: <><Header active="managements" /><AddClass /></>
  },
  {
    path: VIEWCLASSES,
    element: <><Header active="managements" /><ViewClasses /></>
  },
  {
    path: VIEWCLASSDATA + ":id",
    element: <><Header active="managements" /><ViewClassData /></>
  },
  {
    path: ADDSUBJECT,
    element: <><Header active="managements" /><AddSubject /></>
  },
  {
    path: VIEWSUBJECTS,
    element: <><Header active="managements" /><ViewSubjects /></>
  },
  {
    path: VIEWSUBJECTDATA + ":id",
    element: <><Header active="managements" /><ViewSubjectData /></>
  },
  {
    path: ADDABILITYTESTFORM,
    element: <><Header active="tests" /><AddAbilityTestForm /></>
  },
  {
    path: CALENDAR,
    element: <><Header active="calendar" /><Calendar /></>
  },
  {
    path: ACCEPTSTUDENTS,
    element: <><Header active="students" /><AcceptStudents /></>
  },
  {
    path: VIEWMARKS,
    element: <><Header active="marks" /><ViewMarks /></>
  },
  {
    path: SELECTSTUDENTS,
    element: <><Header active="students" /><SelectStudents /></>
  },
  {
    path: DISTRIBUTESTUDENTS,
    element: <><Header active="students" /><DistributeStudents /></>
  },
  {
    path: VIEWSTUDENTDATA + ":id",
    element: <><Header active="students" /><ViewStudentData /></>
  },
  {
    path: VIEWABILITYTESTFORMS,
    element: <><Header active="tests" /><ViewAbilityTestForms /></>
  },
  {
    path: VIEWABILITYTESTFORMDATA + ":id",
    element: <><Header active="tests" /><ViewAbilityTestFormData /></>
  },
]);

function App() {
  return (
    <div className="App" dir='rtl'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;