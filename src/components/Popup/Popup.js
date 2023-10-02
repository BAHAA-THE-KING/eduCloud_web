import styles from "./Popup.module.css";

import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { List, Input } from "..";

function Popup({ allGrades, allSubjects, data, closePopup }) {
   const [edit, setEdit] = useState(false);
   const [editIndex, setEditIndex] = useState(null);
   const [title, setTitle] = useState("");
   const [subject, setSubject] = useState(null);
   const [grade, setGrade] = useState(null);

   return (
      <div className={styles.popup} onClick={closePopup}>
         <div className={styles.content} onClick={e => e.stopPropagation()}>
            <Row className="pt-1 text-purple">
               <b>
                  {data.date.toLocaleDateString("en-Gb")}
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
                                             setTitle(plan.title);
                                             setSubject(plan.subject_id);
                                             setGrade(plan.grade_id);
                                             setEditIndex(i);
                                          } else {
                                             setEdit(false);
                                             setTitle("");
                                             setSubject(null);
                                             setGrade(null);
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
            <Form className={styles.frm}>
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

                  />
               </Row>
               <Row className="pt-2 m-0">
                  <Col>
                     <Button
                        onClick={() => {

                        }}
                        className={`px-5 rounded-4 ${styles.btn}`}
                     >
                        {"Submit"}
                     </Button>
                  </Col>
               </Row>
            </Form>
         </div>
      </div>
   );
}

export default Popup;