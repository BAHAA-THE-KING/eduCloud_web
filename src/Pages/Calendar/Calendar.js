import "./Calendar.css";

import { Title, TextInput, Button, MultipletButton, InputWithLabel, Multiple, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { Col, Container, Form, Row } from "react-bootstrap";

function Calendar() {
   const [data, setData] = useState([]);
   const [grade, setGrade] = useState("");
   const [subject, setSubject] = useState("");

   const [grades, setGrades] = useState([]);
   const [subjects, setSubjects] = useState([]);

   const [selected, setSelected] = useState();
   const [theNew, setTheNew] = useState(false);

   const [title, setTitle] = useState("");
   const [date, setDate] = useState("");
   const [isTest, setIsTest] = useState(false);

   useEffect(
      () => {
         handler.getSubjects(
            data => {
               setGrades(data);
            }
         );
      }
      , []
   );

   useEffect(
      () => {
         let temp = -1;
         for (let i = 0; i < grades.length; i++) {
            if (grades[i].id === grade) {
               temp = i;
               break;
            }
         }
         (temp === -1) ||
            setSubjects(grades[temp].subjects);
      }
      , [grade]
   );

   useEffect(
      () => {
         subject &&
            handler.getBaseCalendar(
               subject,
               data => {
                  setData(data);
               }
            );
      }
      , [subject]
   );

   return (
      <Container fluid className="h-75">
         <Row className="mt-2 h-100">
            <Col xs='2'>
               <Form className="text-start">
                  <Title text="الخطة دراسية" />
                  <Multiple
                     id="grade"
                     text="الصف"
                     options={grades}
                     value={grade}
                     hook={setGrade}
                  />
                  <Multiple
                     id="subject"
                     text="المادة"
                     options={subjects}
                     value={subject}
                     hook={setSubject}
                  />
                  <InputWithLabel
                     id="name"
                     disabled={!theNew && !selected}
                     text="اسم التقدم"
                     hint="الاسم"
                     value={title}
                     hook={setTitle}
                  />
                  <InputWithLabel
                     id="date"
                     type="date"
                     disabled={!theNew && !selected}
                     text="تاريخ التقدم"
                     hint="التاريخ"
                     value={date}
                     hook={setDate}
                  />
                  <InputWithLabel
                     id="isTest"
                     type="checkbox"
                     disabled={!theNew && !selected}
                     text="هل هو سبر"
                     hint="نوع"
                     value={isTest}
                     hook={setIsTest}
                  />
                  <ListOfButtons
                     data={
                        [
                           {
                              name: "إدخال",
                              event: e => {
                                 e.preventDefault();
                                 if (theNew) {
                                    handler.addCalendar(
                                       subject,
                                       title,
                                       date,
                                       isTest,
                                       () => {
                                          setSelected();
                                          setTheNew(false);
                                       }
                                    );
                                 } else if (selected) {
                                    handler.editCalendar(
                                       selected,
                                       title,
                                       date,
                                       isTest,
                                       () => {
                                          setSelected();
                                          setTheNew(false);
                                       }
                                    );
                                 }
                              },
                           }
                        ]
                     }
                  />
               </Form>
            </Col>
            <Col xs='10'>
               <div
                  className="h-100"
                  style={{
                     width: "100%",
                     display: "flex",
                     flexFlow: "nowrap row",
                     justifyContent: "flex-start",
                     alignItems: "center",
                     overflowX: "scroll",
                     overflowY: "hidden"
                  }}
               >
                  {
                     data.map(
                        e =>
                           <>
                              <div
                                 style={{
                                    width: "50px",
                                    height: "50px",
                                    backgroundColor: "pink",
                                    padding: "50px",
                                    borderRadius: "50%",
                                    border: "3px #0000AA solid",
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer"
                                 }}
                                 onClick={
                                    () => {
                                       setSelected(e.id);
                                       setTitle(e.title);
                                       setDate(e.date);
                                       setIsTest(e.is_test);
                                    }
                                 }
                              >
                                 <span>
                                    {e.title}
                                 </span>
                              </div>
                              <div
                                 style={{
                                    width: "70px",
                                    height: "10px",
                                    backgroundColor: "#0000AA"
                                 }}
                              >
                              </div>
                           </>
                     )
                  }
                  {
                     subject && <div
                        style={{
                           width: "50px",
                           height: "50px",
                           backgroundColor: "#CCC",
                           padding: "50px",
                           borderRadius: "50%",
                           border: "3px #0000AA solid",
                           textAlign: "center",
                           display: "flex",
                           alignItems: "center",
                           justifyContent: "center",
                           cursor: "pointer"
                        }}
                        onClick={
                           () => {
                              setSelected();
                              setTitle("");
                              setDate("");
                              setIsTest("");
                              setTheNew(true);
                           }
                        }
                     >
                        <span>
                           +
                        </span>
                     </div>
                  }
               </div>
               {/*{
                     data.map(
                        e => {
                           if (e.id === id) {
                              e.title = title;
                              e.date = date;
                              e.is_test = isTest;
                           }
                           return (
                              <>
                                 <label>{"العنوان : " + e.title}</label>
                                 <TextInput
                                    defaultValue={e.title}
                                    inputHook={
                                       title => {
                                          setTitle(title);
                                          setDate(e.date);
                                          setIsTest(e.is_test);
                                          setId(e.id);
                                       }
                                    }
                                    editable={isEdit}
                                    enterHook={() => { }}
                                    hint="مثال: درس التوابع الخطية"
                                 />
                                 <label>{"تاربخ الانتهاء : "}</label>
                                 <TextInput
                                    type="date"
                                    defaultValue={e.date}
                                    inputHook={
                                       date => {
                                          setTitle(e.title);
                                          setDate(date);
                                          setIsTest(e.is_test);
                                          setId(e.id);
                                       }
                                    }
                                    hint="موعد نهاية الدرس"
                                    editable={isEdit}
                                 />
                                 <label>{"هل هي اختبار ؟" + (e.is_test ? "نعم" : "لا")}</label>
                                 <TextInput
                                    type="checkbox"
                                    defaultValue={!!e.is_test}
                                    inputHook={
                                       isTest => {
                                          setTitle(e.title);
                                          setDate(e.date);
                                          setIsTest(isTest);
                                          setId(e.id);
                                       }
                                    }
                                    editable={isEdit}
                                 />
                              </>
                           )
                        }
                     )
                  }*/}
            </Col>
         </Row>
      </Container>
   );
}

export default Calendar;