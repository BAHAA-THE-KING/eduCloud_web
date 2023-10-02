import styles from "./SchoolCalendar.module.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import * as handlers from '../../handlers';
import { Cell, ContextMenu, MultiList, Loading, Popup, Input } from "../../components";
import { useEffect, useReducer, useState } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";

function SchoolCalendar() {
   const [currentDate, setCurrentDate] = useState(new Date());
   const [currentMonthIndex, setCurrentMonthIndex] = useState(currentDate.getMonth());
   const [allGrades, setAllGrades] = useState([]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [allPlans, setAllPlans] = useState([]);
   const [plans, setPlans] = useState([]);
   const [contextData, setContextData] = useState(null);
   const [popupData, setPopupData] = useState(null);
   const [controllers, setControllers] = useReducer(
      (state, { type, index, value }) =>
         type === "stop" ?
            state.map(e => { e.abort(); return e; })
            : state.map((e, i) => i === index ? value : e),
      [...new Array(2)].fill(new AbortController(), 0, 1)
   );
   const [isLoaded, setIsLoaded] = useReducer(
      (state, { index, value }) =>
         state.map((e, i) => i === index ? value : e),
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
         function closeContext() { setContextData(null); }
         document.addEventListener("click", closeContext);
         return () => {
            document.removeEventListener("click", closeContext);
            setControllers({ type: "stop" });
         }
      },
      // eslint-disable-next-line
      []
   );
   useEffect(
      () => {
         setIsLoaded({ index: 1, value: false });

         const cont = new AbortController();
         setControllers({ index: 1, value: cont });

         handlers.getBaseCalendar(
            grades,
            subjects,
            cont,
            data => {
               const temp = {};
               data.map(
                  // eslint-disable-next-line
                  e => {
                     const yer = Number(e.date.substring(0, 4));
                     const mon = Number(e.date.substring(5, 7)) - 1;
                     const day = Number(e.date.substring(8, 10));
                     const dat = new Date(yer, mon, day);
                     if (temp[dat.toLocaleDateString("en-Gb")]) temp[dat.toLocaleDateString("en-Gb")].push({ ...e, date: dat });
                     else temp[dat.toLocaleDateString("en-Gb")] = [{ ...e, date: dat }];
                  }
               );
               setAllPlans(temp);
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
         setCurrentMonthIndex(currentDate.getMonth());
      },
      [currentDate]
   );
   useEffect(
      () => {
         setPlans(
            [...new Array(36)]
               .map((e, i) => i - 2)
               .map(
                  e => {
                     const date = new Date(currentDate.getFullYear(), currentMonthIndex, e);
                     const real = currentMonthIndex === date.getMonth();
                     return {
                        date,
                        real,
                        plans: (allPlans[date.toLocaleDateString("en-Gb")] ?? []).map(
                           e => {
                              let status;
                              if (e.finished) {
                                 status = "completed";
                              } else {
                                 if (e.date < new Date()) {
                                    status = "skipped";
                                 } else {
                                    status = "pending";
                                 }
                              }
                              return { ...e, status };
                           }
                        )
                     };
                  }
               )
         );
      },
      // eslint-disable-next-line
      [currentMonthIndex, allPlans]
   );

   return (
      <>
         {isLoaded.reduce((p, e) => p && e) || <Loading />}
         {contextData && <ContextMenu data={contextData} />}
         {popupData && <Popup allGrades={allGrades} allSubjects={allSubjects} data={popupData} closePopup={() => setPopupData(null)} />}
         <Container fluid style={{ marginTop: "10px" }}>
            <Row className={`w-100 ${styles.row}`}>
               <div className={styles.viewDate}>
                  <Button
                     onClick={() => setCurrentDate(new Date())}
                     variant="secondary"
                     className="me-2"
                  >
                     Return to today
                  </Button>
                  <Input
                     defaultValue={currentDate.toLocaleDateString("en-Gb")}
                     inputHook={() => { }}
                     enterHook={() => { }}
                     editable={false}
                     className={styles.date}
                  />
               </div>
               <div className={styles.choose}>
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
               <button style={{ width: "100px" }}>
                  <FontAwesomeIcon icon={faGear} className="fs-3 text-light text-black" />
               </button>
            </Row>
            <Row style={{ width: "95%" }}>
               {
                  plans.map(
                     (plan, i) =>
                        <Col
                           key={plan.date}
                           xs='2'
                           className="p-0"
                           onContextMenu={
                              e => {
                                 e.preventDefault();
                                 if (!plan.real) return setContextData(null);
                                 setCurrentDate(plan.date);
                                 setContextData(
                                    {
                                       x: e.clientX,
                                       y: e.clientY,
                                       items: [
                                          {
                                             text: "Add event",
                                             func: () => {
                                                setContextData(null);
                                                setPopupData({ ...plan });
                                             }
                                          }
                                       ]
                                    }
                                 );
                              }
                           }
                        >
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