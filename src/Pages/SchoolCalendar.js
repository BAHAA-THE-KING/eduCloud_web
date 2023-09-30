import { Button, Col, Container, Row } from "react-bootstrap";
import * as handlers from '../handlers';
import { Cell, List, Loading, TextInput } from "../components";
import { useEffect, useReducer, useState } from "react";
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
   const [allPlans, setAllPlans] = useState([]);
   const [plans, setPlans] = useState([]);
   const [controllers, setControllers] = useReducer(
      (state, { type, index, value }) =>
         type === "stop" ?
            state.map(e => { e.abort(); return e; })
            : state.map((e, i) => i === index ? value : e),
      [...new Array(2)].fill(new AbortController(), 0, 1)
   );
   const [isLoaded, setIsLoaded] = useReducer(
      (state, { index, value }) => state.map((e, i) => i === index ? value : e),
      [...new Array(2)].fill(false, 0, 1)
   );

   useEffect(
      () => {
         setIsLoaded({ index: 0, value: false });

         const cont = new AbortController();
         setControllers({ index: 0, value: cont });

         handlers.getClassesAndSubjects(
            controllers[0],
            data => {
               setAllGrades(data);
               setAllSubjects(data.map(e => e.subjects).flat());
            },
            error => {
               Swal.fire(error);
            },
            () => setIsLoaded({ index: 0, value: true })
         );
         return () => setControllers({ type: "stop" })
      },
      []
   );
   useEffect(
      () => {
         setIsLoaded({ index: 1, value: false })

         const cont = new AbortController();
         setControllers({ index: 1, value: cont });

         handlers.getBaseCalendar(
            grades,
            subjects,
            cont,
            data => {
               setAllPlans(data);
               console.log(allPlans);
            },
            error => {
               Swal.fire(error);
            },
            () => setIsLoaded({ index: 1, value: true })
         );
         return () => { cont.abort(); }
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
         {isLoaded.reduce((p, e) => p && e) || <Loading />}
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
                        <Col key={plan.date} xs='2' className="p-0">
                           <Cell
                              key={plan.date}
                              plan={plan}
                              even={(i + 1) % 2}
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