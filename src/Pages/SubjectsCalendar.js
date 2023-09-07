import { Accordion, Container, Row } from "react-bootstrap";
import * as handlers from '../handlers';
import { List, ViewTable } from "../components";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

function SubjectsCalendar() {
   const [allGrades, setAllGrades] = useState([]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [controller, setController] = useState(new AbortController());
   const [allPlans, setAllPlans] = useState([]);

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

   return (
      <>
         <Container fluid style={{ marginTop: "10px", overflow: "auto" }}>
            <Row className="w-100" style={{ flexFlow: "nowrap row", justifyContent: "flex-end" }}>
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
               <div style={{ width: "100px" }}></div>
            </Row>
            <Row style={{ width: "95%" }}>
               <Accordion defaultActiveKey={[]} alwaysOpen>
                  {
                     subjects.map(
                        subjectId => {
                           const grade = allGrades.find(e => e.subjects.find(e => e.id === subjectId));
                           const subject = allSubjects.find(e => e.id === subjectId);
                           const plans = allPlans.filter(e => e.subject.id === subjectId);
                           return (
                              <Accordion.Item eventKey={"" + subjectId}>
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

export default SubjectsCalendar;