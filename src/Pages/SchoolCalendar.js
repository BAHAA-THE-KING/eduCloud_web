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
   const [controller, setController] = useState(new AbortController());
   const [allPlans, setAllPlans] = useState([]);
   const [plans, setPlans] = useState([]);

   useEffect(
      () => {
         handlers.getClassesAndSubjects(
            controller,
            data => {
               setAllGrades(data);
               setAllSubjects(data.map(e => e.subjects).flat());
            },
            error => {
               Swal.fire(error);
            }
         );
         return () => { controller.abort(); }
      },
      []
   );
   useEffect(
      () => {
         const newController = new AbortController();
         setController(newController);
         handlers.getBaseCalendar(
            grades,
            subjects,
            newController,
            setAllPlans,
            error => {
               Swal.fire(error);
            }
         );
         return () => { controller.abort(); }
      },
      [grades, subjects]
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
         <Container fluid style={{ marginTop: "10px" }}>
            <Row className="w-100" style={{ flexFlow: "nowrap row", justifyContent: "flex-end" }}>
               <div style={{ width: "unset", display: "flex", flex: "1" }}>
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
               <div style={{ display: "flex", width: "min-content" }}>
                  <List
                     title="Subjects"
                     opitons={allSubjects.filter(e => grades.find(ee => ee === e.grade_id)).map(e => ({ ...e, name: allGrades.find(ee => ee.id === e.grade_id).name + " " + e.name }))}
                     value={subjects}
                     setValue={setSubjects}
                  />
                  <span>&nbsp;</span>
                  <List
                     title="Grades"
                     opitons={allGrades}
                     value={grades}
                     setValue={setGrades}
                  />
               </div>
               <button style={{ width: "100px" }}>
                  <FontAwesomeIcon icon={faGear} className="fs-3 text-light text-black" />
               </button>
            </Row>
            <Row style={{ width: "95%" }}>
               {
                  plans.map(
                     (plan, i) =>
                        <Col xs='2' className="p-0" key={plan.date}>
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