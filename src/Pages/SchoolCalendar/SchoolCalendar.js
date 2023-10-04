import styles from "./SchoolCalendar.module.css";

import { Button, Col, Container, Row } from "react-bootstrap";
import * as handlers from '../../handlers';
import { Cell, ContextMenu, MultiList, Loading, Popup, Input } from "../../components";
import { useEffect, useReducer, useState } from "react";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import dateFormat from "dateformat";

function SchoolCalendar() {
   const [date, setDate] = useState(dateFormat(new Date(), "yyyy/mm/dd"));
   const [currentDate, setCurrentDate] = useState(new Date());
   const [currentDateId, setCurrentDateId] = useState(currentDate.getFullYear() + "...." + (currentDate.getMonth() + 1));
   const [allGrades, setAllGrades] = useState([]);
   const [grades, setGrades] = useState([]);
   const [allSubjects, setAllSubjects] = useState([]);
   const [subjects, setSubjects] = useState([]);
   const [allPlans, setAllPlans] = useState([]);
   const [plans, setPlans] = useState([]);
   const [contextData, setContextData] = useState(null);
   const [popupData, setPopupData] = useState(null);
   const [refresh, setRefresh] = useState(0);
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
                     if (temp[dateFormat(dat, "yyyy/mm/dd")]) temp[dateFormat(dat, "yyyy/mm/dd")].push({ ...e, date: dat });
                     else temp[dateFormat(dat, "yyyy/mm/dd")] = [{ ...e, date: dat }];
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
      [grades, subjects, refresh]
   );
   useEffect(
      () => {
         setDate(dateFormat(currentDate, "yyyy/mm/dd"));
         setCurrentDateId(currentDate.getFullYear() + "...." + (currentDate.getMonth() + 1));
      },
      [currentDate]
   );
   useEffect(
      () => {
         setPlans(
            [
               [...new Array(7)],
               [...new Array(7)],
               [...new Array(7)],
               [...new Array(7)],
               [...new Array(7)],
               [...new Array(7)]
            ]
               .map((arr, indx) => arr.map((e, i) => indx * 7 + i - ((currentDate.getDay() - currentDate.getDate() + 70) % 7)))
               .map(
                  arr =>
                     arr.map(
                        e => {
                           const date = new Date(currentDateId.split("....")[0], currentDateId.split("....")[1] - 1, e);
                           const real = currentDateId === (date.getFullYear() + "...." + (date.getMonth() + 1));
                           return {
                              date,
                              real,
                              plans: (allPlans[dateFormat(date, "yyyy/mm/dd")] ?? []).map(
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
               )
         );
      },
      // eslint-disable-next-line
      [currentDateId, allPlans]
   );

   return (
      <>
         {isLoaded.reduce((p, e) => p && e) || <Loading />}
         {contextData && <ContextMenu data={contextData} />}
         {
            popupData &&
            <Popup
               allGrades={allGrades}
               allSubjects={allSubjects}
               data={popupData}
               closePopup={() => setPopupData(null)}
               refreshData={
                  () => {
                     setRefresh(refresh + 1);
                  }
               }
            />
         }
         <Container fluid style={{ marginTop: "10px" }}>
            <Row className={`w-100 justify-content-end flex-sm-nowrap flex-sm-row`}>
               <div className={styles.viewDate}>
                  <Button
                     onClick={() => setCurrentDate(new Date())}
                     variant="secondary"
                     className="me-2"
                  >
                     Return to today
                  </Button>
                  <Input
                     defaultValue={date}
                     inputHook={val => setDate(val)}
                     enterHook={
                        val => {
                           const date = new Date(val);
                           if (date.toString() === "Invalid Date") {
                              setDate(dateFormat(currentDate, "yyyy/mm/dd"));
                           } else {
                              setCurrentDate(date);
                           }
                        }
                     }
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
            <Row
               style={{
                  backgroundColor: "white",
                  height: "30px",
                  border: "1px black solid",
                  borderStartStartRadius: '10px',
                  borderStartEndRadius: '10px',
               }}
               className="mt-1"
            >
               <Col>Sunday</Col>
               <Col>Monday</Col>
               <Col>Tueday</Col>
               <Col>Wednsday</Col>
               <Col>Thirsday</Col>
               <Col>Friday</Col>
               <Col>Saturday</Col>
            </Row>
            <Row className="justify-content-center">
               {
                  plans.map(
                     (plans, indx) =>
                        <Row
                           key={indx}
                           className="p-0"
                        >
                           {
                              plans.map(
                                 (plan, i) =>
                                    <Col
                                       key={plan.date}
                                       className={`p-0 ${styles.cellCols}`}
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
                                          even={i % 2}
                                          active={currentDate}
                                          setActive={setCurrentDate}
                                       />
                                    </Col>
                              )
                           }
                        </Row>
                  )
               }
            </Row>
         </Container>
      </>
   );
}

export default SchoolCalendar;