import { Title, TextInput, Button, MultipletButton, Multiple, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { Col, Container, Form, Row } from "react-bootstrap";

function AddSubject() {
   let [name, setName] = useState("");
   let [grade, setGrade] = useState("");
   let [maxMark, setMaxMark] = useState("");
   let [passMark, setPassMark] = useState("");
   let [notes, setNotes] = useState("");

   let [grades, setGrades] = useState([]);
   let [gradeName, setGradeName] = useState("");

   useEffect(
      () => {
         handler.getGrades(setGrades);
      }
      , []
   );

   return (
      <Container fluid>
         <img
            src="Images/class.jpg"
            alt=""
            style={{
               width: "60%",
               height: "CALC(100% - 73px)",
               position: "fixed",
               bottom: "0",
               left: "0",
               transform: "translateX(-25%)",
               clipPath: "ellipse(55% 50% at 30% 50%)"
            }}
         />
         <Row className="mt-3">
            <Col>
               <Form className="w-25 text-start border p-5 ps-4 pt-0">
                  <Title text="إضافة مادة" />
                  <Form.Label htmlFor="name">اسم المادة :</Form.Label>
                  <Form.Control
                     id="name"
                     value={name}
                     onChange={setName}
                     placeholder="مثال: رياضيات - جبر"
                  />
                  <Form.Label htmlFor="maxMark">العلامة الكلية : </Form.Label>
                  <Form.Control
                     id="maxMark"
                     type="number"
                     value={maxMark}
                     onChange={setMaxMark}
                     placeholder="العلامة الكلية"
                  />
                  <Form.Label htmlFor="passMark">علامة النجاح : </Form.Label>
                  <Form.Control
                     id="passMark"
                     type="number"
                     value={passMark}
                     onChange={setPassMark}
                     placeholder="علامة النجاح"
                  />
                  <Form.Label htmlFor="notes">{"الملاحظات : "}</Form.Label>
                  <Form.Control
                     id="notes"
                     value={notes}
                     onChange={setNotes}
                     placeholder="ملاحظات"
                  />
                  <Multiple
                     id="grade"
                     text="الصف الذي تتبع له"
                     options={grades}
                     value={grade}
                     hook={setGrade}
                  />
                  <Row className="mt-3">
                     <ListOfButtons data={
                        [
                           {
                              name: "إدخال",
                              event: e => {
                                 e.preventDefault();
                                 handler.addSubject(
                                    name,
                                    grade,
                                    maxMark,
                                    passMark,
                                    notes,
                                    () => { }
                                 );
                              }
                           }
                        ]
                     } />
                  </Row>
               </Form>
            </Col>
         </Row>
      </Container>
   );
}

export default AddSubject;