import { InputWithLabel, ListOfButtons } from "../../components";
import { useEffect, useState } from "react";
import * as handler from '../../handlers';
import { useParams } from "react-router-dom";
import { Col, Container, Form, Row } from "react-bootstrap";

function ViewTestFormData() {
   const { id } = useParams();

   let [name, setName] = useState("");

   useEffect(
      function () {
         handler.getTestFormData(
            id,
            data => setName(data.name)
         )
      },
      []
   );

   const [isEdit, setIsEdit] = useState(false);

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
         <Row className="mt-2">
            <Col xs='2'>
               <Form className="text-start">
                  <Form.Label>عرض النموذج</Form.Label>
                  <ListOfButtons
                     data={
                        [
                           {
                              name: isEdit ? "تأكيد التعديلات" : "تعديل",
                              event: () => {
                                 if (!isEdit) {
                                    setIsEdit(true);
                                 } else {
                                    handler.editTestForm(
                                       id,
                                       name,
                                       () => {
                                          setIsEdit(false);
                                       }
                                    );
                                 }
                              }
                           }
                        ]
                     }
                  />
                  <InputWithLabel
                     id="name"
                     text="اسم النموذج"
                     hint="اسم النموذج"
                     disabled={!isEdit}
                     value={name}
                     hook={setName}
                  />
               </Form>
            </Col>
         </Row>
      </Container>
   );
}

export default ViewTestFormData;