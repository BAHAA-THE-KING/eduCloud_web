import { Title, Multiple, ListOfButtons, InputWithLabel } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { Col, Container, Form, Row } from "react-bootstrap";

function AddClass() {
   let [name, setName] = useState("");
   let [grade, setGrade] = useState("");
   let [maxNum, setMaxNum] = useState("");

   let [grades, setGrades] = useState([]);

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
                  <Title text="إضافة شعبة" />
                  <InputWithLabel
                     id="name"
                     text="اسم الشعبة"
                     hint="اسم الشعبة"
                     value={name}
                     hook={setName}
                  />
                  <InputWithLabel
                     id="maxNumber"
                     text="العدد الأقصى للطلاب"
                     hint="العدد الأقصى للطلاب"
                     value={maxNum}
                     hook={setMaxNum}
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
                                 handler.addClass(
                                    name,
                                    grade,
                                    maxNum,
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

export default AddClass;