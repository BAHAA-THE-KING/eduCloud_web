import styles from "./ClassCalendar.module.css";

import { Container, Row } from "react-bootstrap";
import * as handlers from '../../handlers';
import { MultiList, Loading, DisplayList } from "../../components";
import { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import dateFormat from "dateformat";

function SubjectsCalendar() {
   const [allGrades, setAllGrades] = useState([]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);
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
               setAllPlans(
                  data.map(
                     e => {
                        const yer = Number(e.date.substring(0, 4));
                        const mon = Number(e.date.substring(5, 7)) - 1;
                        const day = Number(e.date.substring(8, 10));
                        return { ...e, date: new Date(yer, mon, day) };
                     }
                  )
               );
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

   return (
      <>
         {isLoaded.reduce((p, e) => p && e) || <Loading />}
         <Container fluid className={styles.container}>
            <Row className={`w-100 justify-content-end flex-sm-nowrap flex-sm-row`}>
               <div className={styles.choose}>
                  <MultiList
                     title="Classes"
                     opitons={allClasses.filter(e => grades.find(ee => ee === e.grade_id)).map(e => ({ ...e, name: allGrades.find(ee => ee.id === e.grade_id).name + " " + e.name }))}
                     value={classes}
                     setValue={setClasses}
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
            <Row style={{ width: "95%" }}>
               <DisplayList
                  list={
                     classes.map(
                        classId => {
                           const theClass = allClasses.find(e => e.id === classId);
                           const grade = allGrades.find(e => e.g_classes.find(e => e.id === classId));
                           const theSubjects = allSubjects.filter(e => e.grade_id === grade.id && subjects.find(elm => elm === e.id));
                           return theSubjects.map(
                              subject => {
                                 const plans = allPlans
                                    .filter(e => e.subject_id === subject.id)
                                    .map(
                                       e => ({
                                          ...e,
                                          grade: grade.name,
                                          subject: subject.name,
                                          theClass: theClass.name,
                                          date: dateFormat(e.date, "yyyy/mm/dd")
                                       }));
                                 return {
                                    id: classId + "-" + subject.id + "-" + grade.id,
                                    header: grade.name + " " + subject.name + " " + theClass.name,
                                    list: {
                                       headers: [
                                          { title: "Finished", name: "finished" },
                                          { title: "Date", name: "date" },
                                          { title: "Name", name: "title" },
                                          { title: "Subject name", name: "subject" },
                                          { title: "Class name", name: "theClass" },
                                          { title: "Grade name", name: "grade" }
                                       ],
                                       items: plans
                                    }
                                 };
                              }
                           )
                        }
                     ).flat()
                  }
               />
            </Row>
         </Container>
      </>
   );
}

export default SubjectsCalendar;