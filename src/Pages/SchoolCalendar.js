import { Button, Col, Container, Row } from "react-bootstrap";
import * as handlers from '../handlers';
import { Cell, List, TextInput } from "../components";
import { useEffect, useState } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

function SchoolCalendar() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
   const [allGrades, setAllGrades] = useState([]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);
   const [controller, setController] = useState(new AbortController());
   const [allPlans, setAllPlans] = useState([]);
   const [plans, setPlans] = useState([]);

   useEffect(
      () => {
         handlers.getClassesAndSubjects(
            new AbortController(),
            data => {
               setAllGrades(data);
               setAllClasses(data.map(e => e.g_classes).flat());
               setAllSubjects(data.map(e => e.subjects).flat());
            },
            error => {
               Swal.fire(error);
            }
         );
      },
      []
   );
   useEffect(
      () => {
         controller.abort();
         const newController = new AbortController();
         setController(newController);
         handlers.getProgressCalendar(
            grades,
            subjects,
            classes,
            newController,
            setAllPlans,
            error => {
               Swal.fire(error);
            }
         );
      },
      [grades, subjects, classes]
   );
   useEffect(
      () => {
         setCurrentMonth(currentDate.getMonth());
      },
      [currentDate]
   );
   useEffect(
      () => {
         setPlans(
            [...new Array(36)]
               .map((e, i) => i - 2)
               .map(
                  e =>
                  (
                     {
                        date: new Date(currentDate.getFullYear(), currentMonth, e),
                        plans: []
                     }
                  )
               )
         );
      },
      [currentMonth]
   );

   return (
      <>
         <Container className="h-100" fluid style={{ marginTop: "10px" }}>
            <Row className="w-100" style={{ flexFlow: "nowrap row", justifyContent: "space-between" }}>
               <div style={{ width: "500px", display: "flex" }}>
                  <Button
                     onClick={() => setCurrentDate(new Date())}
                     variant="secondary"
                     className="me-2"
                  >
                     Return to today
                  </Button>
                  <TextInput
                     defaultValue={currentDate.toLocaleDateString("en-Gb")}
                     inputHook={() => { }}
                     enterHook={() => { }}
                     editable={false}
                     style={{
                        width: "150px",
                        textAlign: "center",
                        paddingRight: "0",
                        paddingLeft: "0"
                     }}
                  />
               </div>
               <List
                  title="Grades"
                  opitons={allGrades}
                  value={grades}
                  setValue={setGrades}
               />
               <List
                  title="Classes"
                  opitons={allClasses.filter(e => grades.find(ee => ee === e.grade_id)).map(e => ({ ...e, name: allGrades.find(ee => ee.id === e.grade_id).name + " " + e.name }))}
                  value={classes}
                  setValue={setClasses}
               />
               <List
                  title="Subjects"
                  opitons={allSubjects.filter(e => grades.find(ee => ee === e.grade_id)).map(e => ({ ...e, name: allGrades.find(ee => ee.id === e.grade_id).name + " " + e.name }))}
                  value={subjects}
                  setValue={setSubjects}
               />
               <button style={{ width: "100px" }}>
                  <FontAwesomeIcon icon={faGear} className="fs-3 text-light text-black" />
               </button>
            </Row>
            <Row style={{ width: "95%" }}>
               {
                  plans.map(
                     (plan, i) =>
                        <Col xs='2' className="p-0">
                           <Cell
                              key={plan.date}
                              plan={plan}
                              odd={i % 2}
                              active={currentDate}
                              setActive={setCurrentDate}
                           />
                        </Col>
                  )
               }
            </Row>
         </Container>
      </>
   );
}

export default SchoolCalendar;