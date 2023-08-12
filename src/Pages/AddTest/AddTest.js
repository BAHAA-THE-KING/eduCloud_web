import { Title, TextInput, Button, MultipletButton, InputWithLabel, Multiple, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handlers from './../../handlers';
import { useNavigate } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";

function AddTest() {
   const navigate = useNavigate();

   const [title, setTitle] = useState("");
   //img
   const [passMark, setPassMark] = useState(60);
   const [maxMark, setMaxMark] = useState(100);
   const dateObj = new Date();
   const [date, setDate] = useState(dateObj.getFullYear() + "-" + (dateObj.getMonth().length !== 1 ? "0" + dateObj.getMonth() : dateObj.getMonth()) + "-" + (dateObj.getDay().length !== 1 ? "0" + dateObj.getDay() : dateObj.getDay()));
   const [type, setType] = useState("");
   const [typeName, setTypeName] = useState("");
   const [types, setTypes] = useState([]);
   const [theClass, setTheClass] = useState();
   const [theClassName, setTheClassName] = useState("");
   const [subjects, setSubjects] = useState([]);
   const [subject, setSubject] = useState();
   const [subjectName, setSubjectName] = useState("");
   const [grade, setGrade] = useState("");
   const [grades, setGrades] = useState([]);
   const [allClasses, setAllClasses] = useState([]);
   const [classes, setClasses] = useState([]);

   useEffect(
      () => {
         handlers.getSubjects(
            res => {
               setGrades(res.map(e => { return { id: e.id, name: e.name }; }));
               setAllClasses(res);
            }
         );
         handlers.getTestForms(
            res => {
               setTypes(res);
            }
         );
      },
      []
   );

   return (
      <Container fluid>
         <img
            src="Images/addtest.jpg"
            alt=""
            style={{
               width: "60%",
               height: "CALC(100% - 73px)",
               position: "fixed",
               bottom: "0",
               left: "0",
               transform: "translateX(-30%)",
               clipPath: "ellipse(60% 50% at 30% 50%)",
            }}
         />
         <Row className="mt-3">
            <Col>
               <Form className="w-25 text-start border p-5 ps-4 pt-0">
                  <Title text="إنشاء اختبار جديد" />
                  <InputWithLabel
                     id="name"
                     text="اسم الاختبار"
                     hint="الاسم"
                     value={title}
                     hook={setTitle}
                  />
                  <InputWithLabel
                     id="maxMark"
                     type="number"
                     text="العلامة العظمى"
                     hint="العلامة العظمى"
                     value={maxMark}
                     hook={setMaxMark}
                  />
                  <InputWithLabel
                     id="passMark"
                     type="number"
                     text="علامة النجاح"
                     hint="علامة النجاح"
                     value={passMark}
                     hook={setPassMark}
                  />
                  <InputWithLabel
                     id="date"
                     type="date"
                     text="موعد الاختبار"
                     hint="موعد الاختبار"
                     value={date}
                     hook={setDate}
                  />
                  <Multiple
                     id="type"
                     text="نوع الاختبار"
                     options={types}
                     value={type}
                     hook={setType}
                  />
                  <Multiple
                     id="grade"
                     text="الصف"
                     options={grades}
                     value={grade}
                     hook={
                        grade => {
                           setGrade(grade);
                           setTheClass("");
                           setSubject("");
                           const temp = allClasses.filter(e => e.id === grade)[0].g_classes;
                           setClasses(temp);
                           const temp2 = allClasses.filter(e => e.id === grade)[0].subjects;
                           setSubjects(temp2);
                        }
                     }
                  />
                  <Multiple
                     id="class"
                     text="الشعبة"
                     options={classes}
                     value={theClass}
                     hook={setTheClass}
                  />
                  <Multiple
                     id="subject"
                     text="المادة"
                     options={subjects}
                     value={subject}
                     hook={setSubject}
                  />
                  <Row className="mt-3">
                     <ListOfButtons data={
                        [
                           {
                              name: "إدخال",
                              event: e => {
                                 e.preventDefault();
                                 handlers.addTest(
                                    title,
                                    passMark,
                                    maxMark,
                                    type,
                                    date,
                                    theClass,
                                    subject,
                                    () => navigate(handlers.VIEWTESTS)
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

export default AddTest;