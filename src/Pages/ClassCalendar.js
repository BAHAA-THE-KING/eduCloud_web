import { Accordion, Container, Row } from "react-bootstrap";
import * as handlers from '../handlers';
import { MultiList, Loading, ViewTable } from "../components";
import { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";

function ClassCalendar() {
   const [allGrades, setAllGrades] = useState([]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [theClass, setTheClass] = useState([]);
   const [allPlans, setAllPlans] = useState([]);
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
               setAllClasses(data.map(e => e.g_classes).flat());
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
            },
            error => {
               Swal.fire(error);
            },
            () => setIsLoaded({ index: 1, value: true })
         );
         return () => { cont.abort(); }
      },
      [theClass, subjects]
   );

   return (
      <>
         {isLoaded.reduce((p, e) => p && e) || <Loading />}
         <Container fluid style={{ minHeight: "50vh", marginTop: "10px", overflow: "auto" }}>
            <Row className="w-100" style={{ flexFlow: "nowrap row", justifyContent: "flex-end" }}>
               <div style={{ display: "flex", width: "min-content" }}>
                  <MultiList
                     title="Classes"
                     opitons={allClasses}
                     value={theClass}
                     setValue={setTheClass}
                  />
                  <span>&nbsp;</span>
                  <MultiList
                     title="Subjects"
                     opitons={allSubjects.filter(e => grades.find(ee => ee === e.grade_id)).map(e => ({ ...e, name: allGrades.find(ee => ee.id === e.grade_id).name + " " + e.name }))}
                     value={subjects}
                     setValue={setSubjects}
                  />
                  <span>&nbsp;</span>
                  <MultiList
                     title="Grades"
                     opitons={allGrades}
                     value={grades}
                     setValue={setGrades}
                  />
               </div>
               <div style={{ width: "100px" }}></div>
            </Row>
            <Row style={{ width: "95%", marginTop: "10px" }}>
               <Accordion defaultActiveKey={[]} alwaysOpen>
                  {
                     subjects.map(
                        subjectId => {
                           const grade = allGrades.find(e => e.subjects.find(e => e.id === subjectId));
                           const subject = allSubjects.find(e => e.id === subjectId);
                           const plans = allPlans.filter(e => e.subject.id === subjectId);
                           return (
                              <Accordion.Item
                                 key={subjectId}
                                 eventKey={"" + subjectId}
                              >
                                 <Accordion.Header dir="rtl">{grade.name + " " + subject.name}</Accordion.Header>
                                 <Accordion.Body>
                                    <ViewTable rows={plans} />
                                 </Accordion.Body>
                              </Accordion.Item>
                           );
                        }
                     )
                  }
               </Accordion>
            </Row>
         </Container>
      </>
   );
}

export default ClassCalendar;