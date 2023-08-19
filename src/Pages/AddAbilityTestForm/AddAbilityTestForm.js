import { Title, InputWithLabel, Multiple, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handler from './../../handlers';
import { Col, Container, Form, Row } from "react-bootstrap";

function AddAbilityTestForm() {
   const [subject, setSubject] = useState("");
   const [name, setName] = useState("");
   const [isEntry, setIsEntry] = useState(false);
   const [sections, setSections] = useState([]);

   const [subjects, setSubjects] = useState([]);
   const [grade, setGrade] = useState("");
   const [grades, setGrades] = useState([]);

   useEffect(
      () => {
         handler.getSubjects(
            data => {
               setGrades(data);
            }
         );
      },
      []
   );

   useEffect(
      () => {
         setSubjects(grades.find(e => e.id === grade)?.subjects ?? []);
      },
      [grade]
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
               clipPath: "ellipse(60% 50% at 30% 50%)"
            }}
         />
         <Row className="content">
            <Col>
               <Form className="w-25 text-start border p-5 ps-4 pt-0">
                  <Title text="إنشاء نموذج لاختبار القدرات" />
                  <InputWithLabel
                     id="name"
                     text="اسم النموذج"
                     hint="الاسم"
                     value={name}
                     hook={setName}
                  />
                  <InputWithLabel
                     id="type"
                     type="checkbox"
                     text="هل هو اختبار قبول"
                     hint="النوع"
                     value={isEntry}
                     hook={setIsEntry}
                  />
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
                  <Form.Label>الأقسام :</Form.Label>
                  <br />
                  {
                     sections.map(
                        (e, i) =>
                           <>
                              <img src="Icons/deleteRed.svg" onClick={() => setSections([...sections].filter((ee, ii) => ii != i))} />
                              <InputWithLabel
                                 id={"part " + i}
                                 text="القسم"
                                 hint="القسم"
                                 value={e.name}
                                 hook={value =>
                                    setSections(
                                       [...sections]
                                          .map(
                                             (ee, ii) => {
                                                if (ii === i) ee["name"] = value
                                                return ee;
                                             }
                                          )
                                    )}
                              />
                              <InputWithLabel
                                 id={"maxMark " + i}
                                 text="العلامة الكلية"
                                 hint="العلامة الكلية"
                                 value={e.max_mark}
                                 hook={value =>
                                    setSections(
                                       [...sections]
                                          .map(
                                             (ee, ii) => {
                                                if (ii === i) ee["max_mark"] = value
                                                return ee;
                                             }
                                          )
                                    )}
                              />
                              <InputWithLabel
                                 id={"passMark " + i}
                                 text="علامة النجاح"
                                 hint="علامة النجاح"
                                 value={e.min_mark}
                                 hook={value =>
                                    setSections(
                                       [...sections]
                                          .map(
                                             (ee, ii) => {
                                                if (ii === i) ee["min_mark"] = value
                                                return ee;
                                             }
                                          )
                                    )}
                              />
                           </>
                     )
                  }
                  <ListOfButtons
                     data={
                        [
                           {
                              name: "أضف قسماً",
                              event: e => {
                                 e.preventDefault();
                                 setSections([...sections, { "name": "", "min_mark": "", "max_mark": "" }]);
                              }
                           },
                           {
                              name: "إدخال",
                              event: e => {
                                 e.preventDefault();
                                 handler.addAbilityTestForm(
                                    subject,
                                    name,
                                    isEntry,
                                    sections,
                                    () => {
                                       alert("asdasdasd");
                                       //setName("");
                                       //setSections([]);
                                    }
                                 );
                              }
                           },
                        ]
                     }
                  />
               </Form>
            </Col>
         </Row>
      </Container>
   );
}

export default AddAbilityTestForm;