import styles from "./Popup.module.css";

import { Button, Col, Form, Row } from "react-bootstrap";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { List, Input, Loading } from "..";
import * as handlers from "../../handlers";
import Swal from "sweetalert2";
import dateFormat from "dateformat";

function Popup({ allGrades, allSubjects, data, closePopup, refreshData }) {
   const [edit, setEdit] = useState(false);
   const [id, setId] = useState(null);
   const [editIndex, setEditIndex] = useState(null);
   const [title, setTitle] = useState("");
   const [subject, setSubject] = useState(null);
   const [grade, setGrade] = useState(null);
   const [isTest, setIsTest] = useState(false);
   const [isLoaded, setIsLoaded] = useState(true);

   return (
      <>
         {!isLoaded && <Loading />}
         <div className={styles.popup} onClick={closePopup}>
            <div className={styles.content} onClick={e => e.stopPropagation()}>
               <Row className="pt-1 text-purple">
                  <b>
                     {dateFormat(data.date, "yyyy/mm/dd")}
                  </b>
               </Row>
               <Row className={styles.subHeader}>
                  <b>Old tasks</b>
               </Row>
               <Row className={`justify-content-sm-center ${styles.tasks}`}>
                  {
                     data.plans.length === 0 ?
                        <Row className={styles.noPlans}>
                           <b>No tasks in this date.</b>
                        </Row>
                        : data.plans.map(
                           (plan, i) =>
                              <Row
                                 key={plan.id}
                                 className="justify-content-sm-space-between flex-sm-nowrap"
                              >
                                 <Col>
                                    <FontAwesomeIcon
                                       icon={faTrash}
                                       color="red"
                                       className="pointer"
                                       onClick={
                                          () => {
                                          }
                                       }
                                    />
                                 </Col>
                                 <Col>
                                    <FontAwesomeIcon
                                       icon={faPen}
                                       color={i === editIndex ? "rgb(13,110,253)" : "black"}
                                       className="pointer"
                                       onClick={
                                          () => {
                                             if (i !== editIndex) {
                                                setEdit(true);
                                                setId(plan.id);
                                                setTitle(plan.title);
                                                setSubject(plan.subject_id);
                                                setGrade(plan.grade_id);
                                                setIsTest(!!plan.is_test);
                                                setEditIndex(i);
                                             } else {
                                                setEdit(false);
                                                setId(null);
                                                setTitle("");
                                                setSubject(null);
                                                setGrade(null);
                                                setIsTest(false);
                                                setEditIndex(null);
                                             }
                                          }
                                       }
                                    />
                                 </Col>
                                 <Col>{plan.title}</Col>
                              </Row>
                        )
                  }
               </Row>
               <Row className={styles.subHeader}>
                  <b>Add task</b>
               </Row>
               <Row className="pt-2 m-0">
                  <Form.Label className={styles.lbl}>
                     <span>
                        Title:&nbsp;
                     </span>
                  </Form.Label>
                  <Col>
                     <Input
                        type="text"
                        className={`${styles.title}`}
                        hint={"title"}
                        defaultValue={title}
                        inputHook={setTitle}
                     />
                  </Col>
               </Row>
               <Row className="pt-2 m-0">
                  <Form.Label className={styles.lbl}>
                     <span>
                        Grade:&nbsp;
                     </span>
                  </Form.Label>
                  <List
                     title={allGrades.find(e => e.id === grade) ? allGrades.find(e => e.id === grade).name : "grade"}
                     opitons={allGrades}
                     value={grade}
                     setValue={setGrade}
                     className={styles.listHeight}
                  />
               </Row>
               <Row className="pt-2 m-0">
                  <Form.Label className={styles.lbl}>
                     <span>
                        Subject:&nbsp;
                     </span>
                  </Form.Label>
                  <List
                     title={allSubjects.find(e => e.id === subject) ? allSubjects.find(e => e.id === subject).name : "subject"}
                     opitons={allSubjects.filter(e => e.grade_id === grade)}
                     value={subject}
                     setValue={setSubject}
                     className={styles.listHeight}
                  />
               </Row>
               <Row className="pt-2 m-0">
                  <Form.Label className={styles.lbl}>
                     <span>
                        Test:&nbsp;
                     </span>
                  </Form.Label>
                  <Form.Check
                     onChange={e => setIsTest(e.target.checked)}
                     checked={isTest}
                     style={{
                        display: "inline-block",
                        width: "min-content"
                     }}
                  />
               </Row>
               <Row className="pt-2 m-0">
                  <Col>
                     <Button
                        onClick={() => {
                           setIsLoaded(false);
                           if (edit)
                              handlers.editCalendar(
                                 id,
                                 grade,
                                 subject,
                                 title,
                                 dateFormat(data.date, "yyyy/mm/dd"),
                                 isTest,
                                 plan => { refreshData(); Object.assign(data.plans.find(e => e.id === plan.id), plan); },
                                 err => { console.log(err); },
                                 () => { setIsLoaded(true); }
                              );
                           else
                              handlers.addCalendar(
                                 grade,
                                 subject,
                                 title,
                                 dateFormat(data.date, "yyyy/mm/dd"),
                                 isTest,
                                 plans => { refreshData(); data.plans.push(plans[0]); },
                                 err => { console.log(err); },
                                 () => { setIsLoaded(true); }
                              );
                        }}
                        className={`px-5 rounded-4 ${styles.btn}`}
                     >
                        {"Submit"}
                     </Button>
                  </Col>
               </Row>
            </div>
         </div>
      </>
   );
}

export default Popup;