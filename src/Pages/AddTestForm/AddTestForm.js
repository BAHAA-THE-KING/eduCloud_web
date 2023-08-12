import { Title, TextInput, Button, InputWithLabel, ListOfButtons } from "../../components";
import { useState } from "react";
import * as handler from './../../handlers';
import { Col, Container, Form, Row } from "react-bootstrap";

function AddTestForm() {
   let [name, setName] = useState("");

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
         <Row className="mt-3">
            <Col>
               <Form className="w-25 text-start border p-5 ps-4 pt-0">
                  <Title text="إنشاء نموذج لاختبار القدرات" />
                  <InputWithLabel
                     id="name"
                     text="اسم النموذج"
                     hint="اسم النموذج"
                     value={name}
                     hook={setName}
                  />
                  <Row className="mt-3">
                     <ListOfButtons data={
                        [
                           {
                              name: "إدخال",
                              event:
                                 e => {
                                    e.preventDefault();
                                    handler.addTestForm(
                                       name,
                                       () => { }
                                    );
                                 }
                           }
                        ]
                     }
                     />
                  </Row>
               </Form>
            </Col>
         </Row>
      </Container>
   );
}

export default AddTestForm;